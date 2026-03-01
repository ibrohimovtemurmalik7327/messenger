const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthModels = require('./auth.models');
const UserModels = require('../user/user.models');
const config = require('../../config/config');

const { authCfg } = require('./helpers/auth.config');
const { generateOtp, computeExpiresAt } = require('./helpers/otp.helper');
const { isExpired } = require('./helpers/ticket.helper');

class AuthService {
    registerStart = async ({ phone, user_name, password }) => {
        try {
            const [uByName, uByPhone] = await Promise.all([
                AuthModels.findByUserName(user_name),
                AuthModels.findByPhone(phone),
            ]);

            if (uByName) return { success: false, error: 'USERNAME_ALREADY_USED', data: {} };
            if (uByPhone) return { success: false, error: 'PHONE_ALREADY_USED', data: {} };

            const active = await AuthModels.getActiveTicketByPhone('register', phone);
            if (active) {
                return {
                    success: false,
                    error: 'ACTIVE_TICKET_EXISTS',
                    data: { ticket_id: active.id, expires_at: active.expires_at },
                };
            }

            const code = generateOtp();

            const [code_hash, password_hash] = await Promise.all([
                bcrypt.hash(code, authCfg.bcryptCost),
                bcrypt.hash(password, authCfg.bcryptCost),
            ]);

            const ticket = await AuthModels.createRegisterTicket({
                type: 'register',
                phone,
                user_name,
                code_hash,
                password_hash,
                attempts: 0,
                expires_at: computeExpiresAt(),
                status: 'pending',
                created_at: new Date(),
                updated_at: new Date(),
            });

            console.log(`[REGISTER OTP] phone=${phone} code=${code} ticket_id=${ticket?.id}`);

            return { success: true, data: { ticket_id: ticket?.id, expires_at: ticket?.expires_at } };
        } catch {
            return { success: false, error: 'INTERNAL', data: {} };
        }
    };

    registerVerify = async ({ ticket_id, code }) => {
        try {
            const ticket = await AuthModels.getTicketById(ticket_id);

            if (!ticket) return { success: false, error: 'TICKET_NOT_FOUND', data: {} };
            if (ticket.type !== 'register') return { success: false, error: 'INVALID_TICKET_TYPE', data: {} };
            if (ticket.status !== 'pending') return { success: false, error: 'TICKET_NOT_PENDING', data: {} };

            if (isExpired(ticket)) {
                await AuthModels.expireTicket(ticket_id);
                return { success: false, error: 'TICKET_EXPIRED', data: {} };
            }

            const attempts = Number(ticket.attempts ?? 0);
            const max_attempts = Number(ticket.max_attempts ?? 5);

            if (attempts >= max_attempts) {
                await AuthModels.expireTicket(ticket_id);
                return { success: false, error: 'TOO_MANY_ATTEMPTS', data: {} };
            }

            const ok = await bcrypt.compare(String(code).trim(), String(ticket.code_hash));
            if (!ok) {
                await AuthModels.incrementAttempts(ticket_id);

                const left = Math.max(0, max_attempts - (attempts + 1));
                if (attempts + 1 >= max_attempts) await AuthModels.expireTicket(ticket_id);

                return { success: false, error: 'INVALID_CODE', data: { attempts_left: left } };
            }

            const updated = await AuthModels.consumeTicket(ticket_id);
            if (!updated) return { success: false, error: 'TICKET_NOT_PENDING', data: {} };

            try {
                const created = await UserModels.userCreate({
                    phone: ticket.phone,
                    user_name: ticket.user_name,
                    password_hash: ticket.password_hash,
                });

                const user = created?.data ?? created;
                const userId = user?.id;

                if (!userId) return { success: false, error: 'INTERNAL', data: {} };

                const access_token = jwt.sign(
                    { sub: userId },
                    config.jwt.secret,
                    { expiresIn: config.jwt.expiresIn }
                );

                return { success: true, data: { user, access_token } };
            } catch (e) {
                if (e && (e.code === 'ER_DUP_ENTRY' || e.errno === 1062)) {
                    const msg = String(e.sqlMessage || e.message || '');
                    if (msg.includes('phone')) return { success: false, error: 'PHONE_ALREADY_USED', data: {} };
                    if (msg.includes('user_name') || msg.includes('username')) return { success: false, error: 'USERNAME_ALREADY_USED', data: {} };
                    return { success: false, error: 'DUPLICATE', data: {} };
                }
                return { success: false, error: 'INTERNAL', data: {} };
            }
        } catch {
            return { success: false, error: 'INTERNAL', data: {} };
        }
    };

    loginByUserName = async ({ user_name, password }) => {
        try {
            const user = await AuthModels.findByUserName(user_name);
            if (!user) return { success: false, error: 'USER_NAME_OR_PASSWORD_INCORRECT', data: {} };

            const ok = await bcrypt.compare(password, user.password_hash);
            if (!ok) return { success: false, error: 'USER_NAME_OR_PASSWORD_INCORRECT', data: {} };

            const safeUser = { id: user.id, user_name: user.user_name, phone: user.phone };

            const access_token = jwt.sign(
                { sub: safeUser.id },
                config.jwt.secret,
                { expiresIn: config.jwt.expiresIn }
            );

            return { success: true, data: { user: safeUser, access_token } };
        } catch {
            return { success: false, error: 'INTERNAL', data: {} };
        }
    };
}

module.exports = new AuthService();