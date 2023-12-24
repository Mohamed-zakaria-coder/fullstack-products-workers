const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

// Define a method to hash the password before saving the user
userSchema.methods.hashPassword = async function (password) {
  const saltRounds = 10;
  this.password = await bcrypt.hash(password, saltRounds);
};

// Define a method to compare the provided password with the hashed password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
