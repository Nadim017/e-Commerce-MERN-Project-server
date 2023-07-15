const createError = require('http-errors');
const fs = require('fs').promises;

const User = require('../models/userModels');
const { successResponse } = require('./responseController');

const { findWithId } = require('../services/findItem');
const deleteImage = require('../helper/deleteImage');
const { createJSONWebToken } = require('../helper/jsonwebtoken');
const { jwtActivationKey } = require('../secret');

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);

    return successResponse(res, {
      statusCode: 200,
      message: 'user were return successfully',
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || '';
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const searchRegExp = new RegExp('.*' + search + '.*', 'i');
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };
    const options = { password: 0 };
    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await User.find().countDocuments(filter); // all data
    if (!users) throw createError(404, 'no users found');

    return successResponse(res, {
      statusCode: 200,
      message: 'users were return successfully',
      payload: {
        users,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);

    const userImagePath = user.image;
    deleteImage(userImagePath);

    await User.findByIdAndDelete({
      _id: id,
      isAdmin: false,
    });

    return successResponse(res, {
      statusCode: 200,
      message: 'user was deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
const processRegister = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const userExists = await User.exists({ email: email });
    if (userExists) {
      throw createError(
        409,
        'User with this email already exists.Please sign in'
      );
    }

    const token = createJSONWebToken(
      { name, email, password, phone, address },
      jwtActivationKey,

      '10m'
    );

    return successResponse(res, {
      statusCode: 200,
      message: 'user was created successfully',
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { getUsers, getUserById, deleteUserById, processRegister };
