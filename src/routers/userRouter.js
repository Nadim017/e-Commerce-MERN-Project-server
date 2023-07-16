const express = require('express');
const {
  getUsers,
  getUserById,
  deleteUserById,
  processRegister,
  ActivateUserAccount,
} = require('../controllers/userController');
const userRouter = express.Router();

//   /api/users common for every route

userRouter.post('/process-register', processRegister);
userRouter.post('/verify', ActivateUserAccount);
userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.delete('/:id', deleteUserById);

module.exports = userRouter;
