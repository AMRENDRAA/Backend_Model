const fs = require('fs');
const User = require('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllusers = async (req, res, next) => {
  const users = await User.find();
  // send response

  res.status(200).json({
    status: 'success',

    results: users.length,
    data: {
      users,
    },
  });
};
exports.createuser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Inprogress',
  });
};
exports.getuser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Inprogress',
  });
};

exports.updateuser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Inprogress',
  });
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. Create error if user post ppassword data

  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This is not the route for password updates ./Please use UpdateMypassword  ',
        400,
      ),
    );
  }
  //2 .Update the user documemt

  const user = await User.findById(req.user.id);
  user.name = 'Pandit';
  await user.save();

  res.status(200).json({
    status: 'success',
  });
});
