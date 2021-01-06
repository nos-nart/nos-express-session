const Session = require('../models/session.model');

const initSession = async (userId) => {
  const token = await Session.generateToken();
  const session = new Session({ token, userId });
  await session.save();
  return session;
}

module.exports = {
  initSession
}
