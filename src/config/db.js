const mongoose = require('mongoose');
const { mongoDBURL } = require('../secret');
const connectDatabase = async (options = {}) => {
  try {
    await mongoose.connect(mongoDBURL, options);
    console.log('Connection to DB successfully establish');
    mongoose.connection.on('error', (error) => {
      console.error('DB connection error: ', error);
    });
  } catch (error) {
    console.error('Could not connect to DB:', error.toString());
  }
};
module.exports = connectDatabase;
