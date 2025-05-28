const express = require('express');
const fs = require('fs');
const router = express.Router();
const userController = require('./../controller/userController');
// const UserRouter=express.Router();
const authController = require('./../controller/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/allusers', userController.getAllusers);
router.post('/forgotpassword', authController.forgetpassword);
router.patch('/resetPassword/:token', authController.resetpassword);
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updateMyPassword,
);

module.exports = router;
