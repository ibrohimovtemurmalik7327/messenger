const UserService = require('./user.service');
const UserModels = require('./user.models');

class UserController {
    userCreate = async (req, res) => {
        const { phone } = req.body;

        const doesExist = await UserModels.findByPhone(phone);
        if (doesExist) {
            return res.status(409).json({
                message: 'User already exists'
            });
        }

        const user = await UserService.userCreate(req.body);
        return res.status(201).json(user);
    };

    userGetAll = async (req, res) => {
        const users = await UserService.userGetAll();
        return res.status(200).json(users);
    };

    userGetOne = async (req, res) => {
        const id = Number(req.params.id);
        const user = await UserService.userGetOne(id);

        if (!user?.data) return res.status(404).json({message: 'User not found'});
        return res.status(200).json(user);
    };

    userUpdate = async (req, res) => {
        const id = Number(req.params.id);
        const data = req.body;

        const user = await UserService.userGetOne(id);
        if (!user?.data) return res.status(404).json({message: 'User not found'});

        const updated_user = await UserService.userUpdate(id, data);
        return res.status(200).json(updated_user);
    };

    userDelete = async (req, res) => {
        const id = Number(req.params.id);

        const user = await UserService.userGetOne(id);
        if (!user?.data) return res.status(404).json({message: 'User not found'});

        await UserService.userDelete(id);
        return res.sendStatus(204);
    };
}

module.exports = new UserController();