const createHttpError = require('http-errors');
const User = require('../models/userModels');
const mongoose = require('mongoose');

const findUserById = async (id) => {
  try {
    const options = { password: 0 };
    const user = await User.findById(id, options);
    if (!user) {
      throw createHttpError(404, 'user does not exist with this id ');
    }
    return user;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(400, 'invalid user id');
    }
    throw error;
  }
};
module.exports = { findUserById };
