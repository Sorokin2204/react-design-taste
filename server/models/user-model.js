var { Schema  , model} = require('mongoose');

var UserSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  surname: {
    type: String,
    //required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  activeLink: {
    type: String,
    required: true,
  },
  isActivated: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = model('User', UserSchema)