const User = require('../models/user.model');
const { sendApiError, sendApiSuccess } = require('../helpers/response');

const protected = async (req, res, next) => {
  try {
    // Do something
  } catch (error) {
    sendApiError(res, 401, error, 'Something went wrong!');
  }
}

module.exports = {
  protected
}
