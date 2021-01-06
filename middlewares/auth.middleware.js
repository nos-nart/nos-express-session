const Session = require('../models/session.model');
const { sendApiError } = require('../helpers/response');

const authenticate = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (typeof toke !== 'string') {
      throw new Error('Request cookie invalid!');
    }
    const session = await Session.findOne({ token, status: 'valid' });
    if (!session) {
      res.clearCookie('token');
      throw new Error('Your session expired');
    }
    req.session = session;
    next();
  } catch (error) {
    sendApiError(res, 401, error, 'authentication credential invalid!');
  }
}

module.exports = { authenticate }
