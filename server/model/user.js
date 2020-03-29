const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
})

userSchema.pre('save', async function() {
  const hashed = await bcrypt.hash(this.password, 10)
  this.password = hashed;
})

userSchema.post('save', function generateToken() {
  let token = {
    id: this._id,
    username: this.username,
    password: this.password,
    email: this.email, 
  };

  console.log(token)

  return jwt.sign(token, 'secret')
})

module.exports = mongoose.model('User', userSchema)