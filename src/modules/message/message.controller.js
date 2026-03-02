const MessageService = require('./message.service');

class MessageController {
    messageCreate = async (req, res) => {
        const senderId = Number(req.user?.id);
        if (!Number.isInteger(senderId) || senderId <= 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const result = await MessageService.messageCreate(senderId, req.body);

        if (!result.success && result.error === 'USER_NOT_FOUND') {
            return res.status(400).json({ message: 'to_user_id does not exist' });
        }
        if (!result.success) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (!result.success && result.error === 'EMPTY_MESSAGE') {
            return res.status(400).json({ message: 'Message cannot be empty' });
        }

        return res.status(201).json(result.data);
    };

    messageGetAll = async (req, res) => {
        const userId = Number(req.user?.id);
        if (!Number.isInteger(userId) || userId <= 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const messages = await MessageService.messageGetAll(userId);
        return res.status(200).json(messages.data);
    };

    messageGetOne = async (req, res) => {
        const userId = req.user.id;
        const id = Number(req.params.id);

        const result = await MessageService.messageGetOne(id, userId);
        if (!result.success && result.error === 'NOT_FOUND') return res.status(404).json({ message: 'No message found' });
        if (!result.success && result.error === 'FORBIDDEN') return res.status(403).json({ message: 'Forbidden' });

        return res.status(200).json(result.data);
    };

    messageUpdate = async (req, res) => {
        const userId = Number(req.user?.id);
        if (!Number.isInteger(userId) || userId <= 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const id = Number(req.params.id);
        const result = await MessageService.messageUpdate(id, userId, req.body);

        if (!result.success && result.error === 'NOT_FOUND') return res.status(404).json({ message: 'No message found' });

        if (!result.success && result.error === 'FORBIDDEN') return res.status(403).json({ message: 'Forbidden' });

        return res.status(200).json(result.data);
    };

    messageDelete = async (req, res) => {
        const id = Number(req.params.id);

        const result = await MessageService.messageDelete(id, req.user.id);
        if (!result.success && result.error === 'NOT_FOUND') return res.status(404).json({ message: 'No message found' });
        if (!result.success && result.error === 'FORBIDDEN') return res.status(403).json({ message: 'Forbidden' });

        return res.sendStatus(204);
    };
}

module.exports = new MessageController();