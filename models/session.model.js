const mongoose = require('mongoose');
const crypto = require('crypto');

const SessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      require: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    status: {
      type: String,
      enum: ['valid', 'expired'],
      default: 'valid'
    }
  },
  {
    timestamps: true
  }
)

SessionSchema.statics.generateToken = function() {
  return new Promise(function(resolve, reject) {
    crypto.randomBytes(16, function(err, buf) {
      if (err) reject(err);
      const token = buf.toString('hex');
      resolve(token);
    })
  })
}

SessionSchema.statics.expireAllToken = function(userId) {
  return this.updateMany({ userId }, { $set: { status: 'expired' } });
}

SessionSchema.methods.expireToken = function() {
  return this.update({ $set: { status: 'expired' } });
}

module.exports = mongoose.model('Session', SessionSchema);
