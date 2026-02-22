const {validateUserPayload, parseId, nextId} = require('./helpers/user.helpers');
const UserService = require('./user.service');

class UserController {
    userCreate = async (req, res) => {
        const user = await UserService.userCreate(req.body);

        return res.status(201).json(user);
    };

    userGetAll = async (req, res) => {
        const users = await UserService.userGetAll();

        return res.status(200).json(users);
    };

    userGetOne = async (req, res) => {
        const id = parseId(req.params.id);
        if (!id) return res.status(400).json({message: 'Invalid ID'});

        const user = await UserService.userGetOne(id);

        if (!user.data) return res.status(404).json({message: 'User not found'});

        return res.status(200).json(user);
    };

    userUpdate = async (req, res) => {
        const id = parseId(req.params.id);
        const data = req.body;

        if (!id) return res.status(400).json({message: 'Invalid ID'});

        const user = await UserService.userGetOne();
        if (!user.data) return res.status(404).json({message: 'User not found'});

        const updated_user = await UserService.userUpdate(id, data);

        return res.status(200).json(updated_user);
    };

    userDelete = async (req, res) => {
        const id = parseId(req.params.id);
        if (!id) return res.status(400).json({message: 'Invalid ID'});

        await UserService.userDelete(id);

        return res.sendStatus(204);
    };
}

module.exports = new UserController();