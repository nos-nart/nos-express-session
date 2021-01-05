const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (val) {
          return //reg;
        },
        message: 'Invalid email!'
      }
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema);
