const MessageModels = require('./message.models');
const UserModels = require('../user/user.models');

class MessageService {
    messageCreate = async (data) => {
        try {
            const fromId = Number(data.from_user_id);
            const toId = Number(data.to_user_id);

            const ids = [fromId, toId];
            const uniqueIds = [...new Set(ids)];

            const existingIds = await UserModels.getExistingIds(uniqueIds);

            if (existingIds.length !== uniqueIds.length) {
                return { success: false, error: 'USER_NOT_FOUND', data: {} };
            }

            const result = await MessageModels.messageCreate(data);
            return { success: true, data: result };
        } catch (error) {
            if (error?.errno === 1452) {
                return { success: false, error: 'USER_NOT_FOUND', data: {} };
            }
            return { success: false, error, data: {} };
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

    messageGetOne = async (id) => {
        try {
            const message = await MessageModels.messageGetOne(id);
            return {
                success: true,
                data: message
            };
        } catch (error) {
            return {
                success: false,
                error: error,
                data: {}
            };
        }
    };

    messageUpdate = async (id, data) => {
        try {
            const message = await MessageModels.messageUpdate(id, data);
            return {
                success: true,
                data: message
            };
        } catch (error) {
            return {
                success: false,
                error: error,
                data: {}
            };
        }
    };

    messageDelete = async (id) => {
        try {
            const message = await MessageModels.messageDelete(id);
            return {
                success: true,
                data: message
            };
        } catch (error) {
            return {
                success: false,
                error: error,
                data: {}
            };
        }
    };
}

module.exports = new MessageService();