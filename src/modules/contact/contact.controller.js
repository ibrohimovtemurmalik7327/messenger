const ContactService = require('./contact.service');

class ContactController {
    contactCreate = async (req, res) => {
        const contact = await ContactService.contactCreate(req.body);
        return res.status(200).json(contact);
    };

    contactGetAll = async (req, res) => {
        const contacts = await ContactService.contactGetAll(req.params.id);
        return res.status(200).json(contacts);
    };

    contactGetOne = async (req, res) => {
        const id = Number(req.params.id);
        const contact = await ContactService.contactGetOne(id);

        if (!contact?.data) return res.status(404).json({message: 'Contact not found'});
        return res.status(200).json(contact);
    };

    contactUpdate = async (req, res) => {
        const id = Number(req.params.id);
        const data = req.body;

        const contact = await ContactService.contactUpdate(id);
        if (!contact?.data) return res.status(404).json({message: 'Contact not found'});

        const updated_contact = await ContactService.contactUpdate(id, data);
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