const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const SALT_ROUND = 10;
const validateEmail = function(email) {
  const REG = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return REG.test(email);
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email required!'],
      unique: true,
      validate: [validateEmail, 'Invalid Email!']
    },
    password: {
      type: String,
      required: [true, 'Password required!'],
      trim: true,
      min: [6, 'Password too short!'],
      max: [20, 'Password too long!']
    },
  },
  {
    timestamps: true
  }
)

UserSchema.pre('save', function(next) {
  const user = this;
  if (this.isModified('password')) {
    bcrypt.hash(user.password, SALT_ROUND, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      return next();
    })
  } else {
    next();
  }
})

UserSchema.statics.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
}

module.exports = mongoose.model('User', UserSchema);
