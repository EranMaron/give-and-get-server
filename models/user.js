const mongoose = require("mongoose")

const user = new mongoose.Schema(
  {
      phone_number: Number,
      password: String,
      name: String,
      given_tasks: [],
      gotten_tasks: [],
      contact_list: []
  },
  { collection: "users" }
);

const User = mongoose.model("User", user);

module.exports = User;