var { Schema, model } = require('mongoose');

var TokenShema = new Schema({
  User: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

module.exports = model('Token', TokenShema);
