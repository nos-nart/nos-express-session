const User = require('../models/user.model');
const Session = require('../models/session.model');
const { sendApiError, sendApiSuccess } = require('../helpers/response');

const protected = async (req, res, next) => {
  try {
    // Check to session status here
  } catch (error) {
    sendApiError(res, 401, error, 'Something went wrong!');
  }
}

module.exports = {
  protected
}
