const MessageService = require('./message.service');

class MessageController {
    messageCreate = async (req, res) => {
        const result = await MessageService.messageCreate(req.body);

        if (!result.success && result.error === 'USER_NOT_FOUND') {
            return res.status(400).json({ message: 'from_user_id or to_user_id does not exist' });
        }

        if (!result.success) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        return res.status(201).json(result);
    };

    messageGetAll = async (req, res) => {
        const messages = await MessageService.messageGetAll(req.params.id);
        return res.status(200).json(messages);
    };

    messageGetOne = async (req, res) => {
        const id = req.params.id;
        const message = await MessageService.messageGetOne(id);

        if(!message?.data) return res.status(404).json({message: 'No message found'});
        return res.status(200).json(message);
    };

    messageUpdate = async (req, res) => {
        const id = Number(req.params.id);
        const data = req.body;

        const result = await MessageService.messageUpdate(id, data);

        if(!result.data) return res.status(404).json({message: 'No message found'});

        return res.status(200).json(result);
    };

    messageDelete = async (req, res) => {
        const id = Number(req.params.id);

        const message = await MessageService.messageDelete(id);
        if(!message?.data) return res.status(404).json({message: 'No message found'});

        await MessageService.messageDelete(id);
        return res.status(200).json(message);
    };
}

module.exports = new MessageController();