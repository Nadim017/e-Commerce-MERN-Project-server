const data = require('../data');
const User = require('../models/userModels');

const seedUser = async (req, res, next) => {
  try {
    // deleting all the existing users
    await User.deleteMany({});

    // inserting new users
    const users = await User.insertMany(data.users);

    // successful response
    return res.status(201).json(users);
  } catch (error) {
    next(error);
  }
};
module.exports = { seedUser };
