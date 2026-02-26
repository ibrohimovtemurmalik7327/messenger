const ContactService = require('./contact.service');

class ContactController {
    contactCreate = async (req, res) => {
        const result = await ContactService.contactCreate(req.body);
        if (!result.success) {
            if (result.error?.code === 'ER_DUP_ENTRY') {
                return res.status(409).json(result);
            }
            return res.status(500).json(result);
        }
        return res.status(201).json(result);
    };

    contactGetAll = async (req, res) => {
        const contacts = await ContactService.contactGetAll(Number(req.params.owner_id));
        return res.status(200).json(contacts);
    };

    contactGetOne = async (req, res) => {
        const id = Number(req.params.id);
        const contact = await ContactService.contactGetOne(id);

        if (!contact?.data) return res.status(404).json({message: 'Contact not found'});
        return res.status(200).json(contact);
    };

    contactUpdate = async (req, res) => {
        const user_id = Number(req.params.id);
        const data = req.body;

        const contact = await ContactService.contactUpdate(user_id);
        if (!contact?.data) return res.status(404).json({message: 'Contact not found'});

        const updated_contact = await ContactService.contactUpdate(user_id, data);
        return res.status(200).json(updated_contact);
    };

    contactDelete = async (req, res) => {
        const id = Number(req.params.id);

        const contact = await ContactService.contactDelete(id);
        if (!contact?.data) return res.status(404).json({message: 'Contact not found'});

        await ContactService.contactDelete(id);
        return res.status(200).json(contact);
    };
}

module.exports = new ContactController();