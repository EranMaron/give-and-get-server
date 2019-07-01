const mongoose = require("mongoose");
const consts = require("./consts");

const { MLAB_URL, DB_USER, DB_PASS } = consts;
const url = `mongodb://db_usr:db_pass1@ds263656.mlab.com:63656/givegetdb`

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  user: 'db_usr',
  pass: 'db_pass1',
  autoReconnect: true
};

mongoose.connect(url, options)
  .then(() => console.log("Connected To DB"))
  .catch(err => console.log(`connection error: ${err}`));