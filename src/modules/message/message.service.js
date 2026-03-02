const MessageModels = require('./message.models');
const UserModels = require('../user/user.models');

class MessageService {
    messageCreate = async (senderId, data) => {
        try {
            const toId = Number(data.to_user_id);

            if (!Number.isInteger(toId) || toId <= 0) {
                return { success: false, error: 'INVALID_TO_ID', data: null };
            }

            if (toId === senderId) {
                return { success: false, error: 'CANNOT_MESSAGE_SELF', data: null };
            }

            const existingIds = await UserModels.getExistingIds([toId]);
            if (existingIds.length !== 1) {
                return { success: false, error: 'USER_NOT_FOUND', data: null };
            }

            const message = String(data.message || '').trim();
            if (!message) return { success:false, error:'EMPTY_MESSAGE', data:null };

            const payload = {
                from_user_id: senderId,
                to_user_id: toId,
                message: String(data.message || '').trim(),
            };

            const result = await MessageModels.messageCreate(payload);
            return { success: true, data: result };
        } catch (error) {
            if (error?.errno === 1452) {
                return { success: false, error: 'USER_NOT_FOUND', data: null };
            }
            return { success: false, error: 'INTERNAL', data: null };
        }
    };

    messageGetAll = async (user_id) => {
        try {
            const messages = await MessageModels.messageGetAll(user_id);
            return {
                success: true,
                data: messages
            };
        } catch (error) {
            return {
                success: false,
                error: error,
                data: {}
            };
        }
    };

    messageGetOne = async (id, userId) => {
        const msg = await MessageModels.messageGetOne(id);
        if (!msg) return { success: false, error: 'NOT_FOUND', data: null };

        const allowed = (msg.from_user_id === userId) || (msg.to_user_id === userId);
        if (!allowed) return { success: false, error: 'FORBIDDEN', data: null };

        return { success: true, data: msg };
    };

    messageUpdate = async (id, userId, data) => {
        try {
            const msg = await MessageModels.messageGetOne(id);
            if (!msg) return { success: false, error: 'NOT_FOUND', data: null };
            if (msg.from_user_id !== userId) return { success: false, error: 'FORBIDDEN', data: null };

            const message = String(data.message || '').trim();
            if (!message) return { success: false, error: 'EMPTY_MESSAGE', data: null };

            const updated = await MessageModels.messageUpdate(id, { message });
            return { success: true, data: updated };
        } catch (e) {
            return { success: false, error: 'INTERNAL', data: null };
        }
    };

    messageDelete = async (id, userId) => {
        try {
            const msg = await MessageModels.messageGetOne(id);
            if (!msg) return { success: false, error: 'NOT_FOUND', data: null };

            if (msg.from_user_id !== userId) {
                return { success: false, error: 'FORBIDDEN', data: null };
            }

            await MessageModels.messageDelete(id);
            return { success: true, data: null };
        } catch (error) {
            return { success: false, error: 'INTERNAL', data: null };
        }
    };
}

module.exports = new MessageService();