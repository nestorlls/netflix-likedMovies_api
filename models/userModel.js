const mongoose = require('mongoose');

const userSchema = {
  email: { type: String, require: true, unique: true },
  myList: Array,
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
