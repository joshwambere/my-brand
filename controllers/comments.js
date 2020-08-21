const Qry = require('../models/query');

class Comments {
    async addComment(req, res) {
        const qry = new Qry({
            name: req.body.name,
            email: req.body.email,
            comment: req.body.comment,
          });
          await qry.save();
          res.send(qry);
    }
}
module.exports = Comments;
