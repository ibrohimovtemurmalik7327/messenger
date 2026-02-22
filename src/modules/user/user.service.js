const bcrypt = require('bcrypt');
const {validateUserPayload, nextId, parseId} = require("./helpers/user.helpers");
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
            })

            return {
                success: true,
                data: user
            }
        } catch (error) {
            return {
                success: false,
                error: error,
                data: {}
            }
        }
    }

    userGetAll = async () => {
        return users;
    }

    userGetOne = async () => {

    }

    userUpdate = async () => {

    }

    userDelete = async () => {

    }
}

module.exports = new UserService();