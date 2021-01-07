const User = require('../models/user.model');
const Session = require('../models/session.model');
const { sendApiSuccess, sendApiError } = require('../helpers/response');
const { initSession } = require('../helpers/session');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    const persitedUser = await newUser.save();

    const session = await initSession(persitedUser._id);
    req.session.user = email;
    res.cookie('token', session.token, {
      httpOnly: true,
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 2,
      secure: process.env.NODE_ENV === 'prod'
    });

    sendApiSuccess(res, 201, persitedUser, 'New user registed');
  } catch (error) {
    sendApiError(res, 400, error, 'Registration got error');
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email })
      if (!user) {
        sendApiError(res, 500, err, 'No account found!');
      }
      const isPwMatch = await bcrypt.compare(password, user.password);
      if (!isPwMatch) {
        throw new Error();
      }

      const session = await initSession(data._id);
      res.cookie('token', session.token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 2,
        secure: process.env.NODE_ENV === 'prod'
      })

      sendApiSuccess(res, 201, {}, 'Login successfully');
    }
  } catch (error) {
    sendApiError(res, 401, error, 'Check your email and password');
  }
}

const logout = async (req, res, next) => {
  try {
    const { session } = req;
    await session.expireToken(session.token);
    res.clearCookie('token');

    sendApiSuccess(res, 200, {}, 'Logout succesfully!');
  } catch (error) {
    sendApiError(res, 400, error, 'Logout failed!');
  }
}

module.exports = {
  register,
  login,
  logout
}
