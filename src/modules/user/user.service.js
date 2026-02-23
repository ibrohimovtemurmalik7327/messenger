const bcrypt = require('bcrypt');
const UserModels = require("./user.models")

class UserService {
    userCreate = async (data) => {
        try {
            const password_hash = await bcrypt.hash(data.password, 10);

            const user = await UserModels.userCreate({
                email: data.email,
                phone: data.phone,
                login: data.login,
                password_hash: password_hash,
                user_name: data.user_name,
                first_name: data.first_name,
                last_name: data.last_name,
                age: data.age,
                avatar_url: data.avatar_url
            });

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