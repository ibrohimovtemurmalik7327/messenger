const MessageService = require('./message.service');

class MessageController {
    messageCreate = async (req, res) => {
        const message = await MessageService.messageCreate(req.body);
        return res.status(200).json(message);
    };

    messageGetAll = async (req, res) => {
        const messages = await MessageService.messageGetAll(req.params.id);
        return res.status(200).json(messages);
    };

    messageGetOne = async (req, res) => {
        const user_id = req.params.id;
        const message = await MessageService.messageGetOne(user_id);

        if(!message?.data) return res.status(404).json({message: 'No message found'});
        return res.status(200).json(message);
    };

    messageUpdate = async (req, res) => {
        const id = Number(req.params.id);
        const data = req.body;

        const message = await MessageService.messageUpdate(id);
        if(!message?.data) return res.status(404).json({message: 'No message found'});

        const updated_message = await MessageService.messageUpdate(id, data);
        return res.status(200).json(updated_message);
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