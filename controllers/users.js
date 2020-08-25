
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class Users {
    async signUp(req, res) {
        const user = new User({
            email: 'hello2@gmail.com',
            password: 'password2',
            isadmin: true,
          });
          try {
            await user.save();
            res.send(user);
          } catch (error) {
            return res.status(400).json({
              status: 400,
              error: error.message,
            });
          }
    }
    async signIn(req, res) {
        const userFound = await User.findOne({ email: req.body.email });
        if (userFound) {
          if (userFound.password === req.body.password) {
            const data = {
              email: userFound.email,
              isadmin: userFound.isadmin,
            };
            const token = jwt.sign(data, 'johnson', { expiresIn: '1h' });
            return res.status(200).json({
              status: 200,
              message: 'User signed in successfully',
              data: userFound,
              token: token,
            });
          } else {
            return res.status(401).json({
              status: 401,
              error: 'Incorrect email/password',
            });
          }
        } else {
          return res.status(401).json({
            status: 401,
            error: 'Incorrect email/password',
          });
        }
    }
}
module.exports = Users;

  