const mongoose = require("mongoose");
const consts = require("./consts");

// const { MLAB_URL, DB_USER, DB_PASS } = consts;
const url = process.env.MLAB_URL

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  autoReconnect: true
};

mongoose.connect(url, options)
  .then(() => console.log("Connected To DB"))
  .catch(err => console.log(`connection error: ${err}`));