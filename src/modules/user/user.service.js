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
            };

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
        } catch (error) {
            return {
                success: false,
                error: error,
                data: {}
            };
        }
    };

    userChangePassword = async (id, data) => {
        try {
            const { old_password, new_password } = data;

            const oldPasswordHash = await UserModels.getPasswordHashById(id);

            if (!oldPasswordHash) {
                return {
                    success: false,
                    error: 'User not found',
                    data: {}
                };
            }

            const isMatch = await bcrypt.compare(old_password, oldPasswordHash);

            if (!isMatch) {
                return {
                    success: false,
                    error: 'Old password incorrect',
                    data: {}
                };
            }

            const hashedNewPassword = await bcrypt.hash(new_password, BCRYPT_COST);

            const result = await UserModels.userChangePassword(id, hashedNewPassword);

            return {
                success: true,
                data: result
            };
        } catch (error) {
            return {
                success: false,
                error: error?.message || error,
                data: {}
            };
        }
    };
}

module.exports = new UserService();