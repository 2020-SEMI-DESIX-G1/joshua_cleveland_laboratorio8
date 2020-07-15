const mongoose = require('mongoose');

const MONGO_URL = `mongodb://192.168.0.2:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`;

const mongoOptions = {
  user: '',
  pass: '',
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDb = () => mongoose.connect(MONGO_URL, mongoOptions);

module.exports = connectDb;