const createHttpError = require('http-errors');
const User = require('../models/userModels');
const mongoose = require('mongoose');

const findWithId = async (id, options = {}) => {
  try {
    const item = await User.findById(id, options);
    if (!item) {
      throw createHttpError(404, 'user does not exist with this id ');
    }
    return item;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(400, 'invalid item id');
    }
    throw error;
  }
};
module.exports = { findWithId };
