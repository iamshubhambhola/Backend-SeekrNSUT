const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const providerList = ["email", "phone_number", "google", "facebook"];
const transformFields = [
  "role",
  "createdAt",
  "blocked",
  "active",
  "confirmed",
  "phone_number",
];

const TagSchema = new mongoose.Schema(
  {
    name : {
        type: String,
    },
  }
);

module.exports = mongoose.model('Tags', TagSchema);