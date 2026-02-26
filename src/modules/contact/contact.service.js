const ContactModels = require('./contact.models');

class ContactService {
    contactCreate = async (data) => {
        try {
            const result = await ContactModels.contactCreate(data);
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

    contactGetAll = async (user_id) => {
        try {
            const contacts = await ContactModels.contactGetAll(user_id);
            return {
                success: true,
                data: contacts
            };
        } catch (error) {
            return {
                success: false,
                error: error,
                data: {}
            };
        }
    };

    contactGetOne = async (id) => {
        try {
            const contact = await ContactModels.contactGetOne(id);
            return {
                success: true,
                data: contact
            };
        } catch (error) {
            return {
                success: false,
                error: error,
                data: {}
            };
        }
    };

    contactUpdate = async (id, data) => {
        try {
            const contact = await ContactModels.contactUpdate(id, data);
            return {
                success: true,
                data: contact
            };
        } catch (error) {
            return {
                success: false,
                error: error,
                data: {}
            };
        }
    };

    contactDelete = async (user_id) => {
        try {
            const result = await ContactModels.contactDelete(user_id);
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
}

module.exports = new ContactService();