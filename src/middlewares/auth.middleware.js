const jwt = require('jsonwebtoken');
const config = require('../config/config');
const UserModels = require('../modules/user/user.models');

const authRequired = async (req, res, next) => {
    try {
        const [type, token] = (req.headers.authorization || '').split(' ');

        if (type !== 'Bearer' || !token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const payload = jwt.verify(token, config.jwt.secret);

        const userId = Number(payload?.sub);
        if (!Number.isInteger(userId) || userId <= 0) {
            return res.status(401).json({ message: 'Invalid token payload' });
        }

        const found = await UserModels.userGetOne(userId);
        const user = found?.data ?? found;

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = { id: user.id, user_name: user.user_name, phone: user.phone };
        return next();
    } catch (e) {
        if (e.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { authRequired };