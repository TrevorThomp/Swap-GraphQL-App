const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  name: String,
  category: String,
  userID: String
})

module.exports = mongoose.model('Job', jobSchema)