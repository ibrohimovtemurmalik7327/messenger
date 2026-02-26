const MessageModels = require('./message.models');

class MessageService {
    messageCreate = async function (data) {
        try {
            const result = await MessageModels.messageCreate(data);

            return {
                success: true,
                data: result
            };
        } catch (error) {
            return {
                success: false,
                error: error,
                data: {}
            };
        }
    };

    messageGetAll = async (userId) => {
        try {
            const messages = await MessageModels.messageGetAll(userId);
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

    messageGetOne = async (user_id) => {
        try {
            const message = await MessageModels.messageGetOne(user_id);
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