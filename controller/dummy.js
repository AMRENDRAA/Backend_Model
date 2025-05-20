
//     // 2 verification of the token 
//     const decoded = await promisify(token,process.env.JWT_SECRET)
//     console.log(decoded );

//  // 3) Check if user exists
//  const currentUser = await User.findById(decoded.id);
//  if (!currentUser) {
//    return next(new AppError('The user belonging to this token no longer exists.', 401));
//  }

//  // 4) Check if user changed password after the JWT token was issued
//  if (currentUser.changedPasswordAfter(decoded.iat)) {
//    return next(new AppError('User recently changed password! Please log in again.', 401));}