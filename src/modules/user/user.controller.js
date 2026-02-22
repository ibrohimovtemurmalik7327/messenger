const {validateUserPayload, parseId, nextId} = require('./helpers/user.helpers');
const UserService = require('./user.service');

class UserController {
    userCreate = async (req, res) => {
        const user = await UserService.userCreate(req.body);

        return res.status(201).json(user);
    }

    userGetAll = async (req, res) => {
        const users = await UserService.userGetAll();

        return res.status(200).json(users);
    }

    userGetOne = async (req, res) => {
        const id = parseId(req.params.id);
        if (!id) return res.status(400).json({message: 'Invalid ID'});

        const user = users.find(u => u.id === id);
        if (!user) return res.status(404).json({message: 'User not found'});

        return res.status(200).json(user);
    }

    userUpdate = async (req, res) => {
        const id = parseId(req.params.id);
        if (!id) return res.status(400).json({message: 'Invalid ID'});

        const user = users.find(u => u.id === id);
        if (!user) return res.status(404).json({message: 'User not found'});

        const v = validateUserPayload(req.body);
        if (!v.ok) return res.status(400).json({message: v.message});

        user.name = v.data.name;
        user.age = v.data.age;

        return res.status(200).json(user);
    }

    userDelete = async (req, res) => {
        const id = parseId(req.params.id);
        if (!id) return res.status(400).json({message: 'Invalid ID'});

        const index = users.findIndex(u => u.id === id);
        if (index === -1) return res.status(404).json({message: 'User not found'});

        users.splice(index, 1);

        return res.sendStatus(204);
    }
}

module.exports = new UserController();