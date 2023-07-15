const express = require('express');
const {
  getUsers,
  getUserById,
  deleteUserById,
} = require('../controllers/userController');
const userRouter = express.Router();

//   /api/users common for every route

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.delete('/:id', deleteUserById);

module.exports = userRouter;
