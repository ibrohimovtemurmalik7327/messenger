const bcrypt = require('bcrypt');
const BCRYPT_COST = Number(process.env.BCRYPT_COST || 15);
const UserModels = require("./user.models")

class UserService {
    userCreate = async (data) => {
        try {
            const user = {
                phone: data.phone,
                user_name: data.user_name,
                email: data.email ?? null,
                avatar_url: data.avatar_url ?? null,
            };

            if (data.password) {
                user.password_hash = await bcrypt.hash(data.password, BCRYPT_COST);
            }

            await UserModels.userCreate(user);

            return {
                success: true,
                data: user
            };
        } catch (error) {
            return {
                success: false,
                error: error,
                data: {}
            };
        }
    };

    userGetAll = async () => {
        try {
            const users = await UserModels.userGetAll();
            return {
                success: true,
                data: users
            };
        }
        catch (error) {
            return {
                success: false,
                error: error,
                data: {}
            };
        }
    };

    userGetOne = async (id) => {
        try{
            const user = await UserModels.userGetOne(id);
            return {
                success: true,
                data: user
            };
        }
        catch (error) {
            return {
                success: false,
                error: error,
                data: {}
            };
        }
    };

    userUpdate = async (id, data) => {
        try{
            const updated_user = await UserModels.userUpdate(id, data);
            return {
                success: true,
                data: updated_user
            };
        }
        catch (error) {
            return {
                success: false,
                error: error,
                data: {}
            };
        }
    };

    userDelete = async (id) => {
        try {
            const result = await UserModels.userDelete(id);
            return {
                success: true,
                data: result
            };
        }
        catch (error) {
            return {
                success: false,
                error: error,
                data: {}
            };
        }
    };
}

module.exports = new UserService();