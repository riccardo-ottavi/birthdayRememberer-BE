const mongoose = require("mongoose");

const birthdaySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Birthday", birthdaySchema);