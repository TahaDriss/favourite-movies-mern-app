var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true
  },
  movies: { type: Array, default: [] }
});
module.exports = mongoose.model("User", userSchema);
