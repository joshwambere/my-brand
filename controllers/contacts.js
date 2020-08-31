const Cont = require('../models/contacts');

class Contact {
    async sendMsg(req, res) {
        const contact = new Cont({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            subject:req.body.subject,
          });
          await contact.save();
          res.send(contact);
    }
}
module.exports = Contact;
