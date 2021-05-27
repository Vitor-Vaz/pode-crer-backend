const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const AppError = require('../helper/AppError');
const authConfig = require('../config/auth');

module.exports = {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new AppError({ message: 'User not Found', statusCode: 401 });
    }
    if (!await bcrypt.compare(password, user.password_hash)) {
      throw new AppError({ message: 'Password incorreto', statusCode: 401 });
    }

    return res.json({
      user,
      token: jwt.sign({ id: req.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  },
};
