const User=require('./../model/userModel');
const {promisify}=require('util');
const jwt=require('jsonwebtoken');
const catchAsync=require('./../utils/catchAsync');
const AppError=require('./../utils/appError');

const sendEmail=require('./../utils/email');
const signToken=id=>{
    return jwt.sign({ id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN});
}
exports.signup=  async(req,res,next)=>{

    try{
        
        const newUser= await User.create(req.body)
        const token= signToken(newUser._id)
        res.status(201).json({
            status:'success',
            token,
            data:{
                user:newUser
            }
        });

    }catch(err){
        res.status(400).json({
            status:'failed',
            message:err.message
        });
    }

 

};

exports.login= catchAsync(async(req,res,next)=>{

   
    const {email,password}=req.body;

   //Check if email and password exist
   if(!email ||!password){
    return next(new AppError('Please provide email and password !',400))
   } 
// 2) check if user exists &&password is correct

const user= await User.findOne({email}).select('+password');

console.log(user);
console.log(password);





if(!user ||! (await user.correctPassword(password,user.password))){
    return next(new AppError('INCORRECT EMAIL OR PASSWORD'),401);
}

//3)If everything is ok ,send token to client

const token=signToken(user._id);
res.status(200).json({

    status :'success',
    token
})



});

exports.protect=catchAsync(async(req,res,next)=>{
    
let token;
    //1 Getting the token if it exist
    
 // 1) Get token from header
 if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 2) If token not found
  if (!token) {
    return next(new AppError('You are not logged in! Please login.', 401));
  }



//2 Verify the token  
const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
console.log(decoded);

// 3 Check if user still exists 

const freshUser= await User.findById(decoded.id);
if (!freshUser){
    return next(new AppError('The user belonging to this token is no longer',401));

}


// //4 Check if user changed password after the token was issued 


// if (freshUser.changedPasswordAfter(decoded.iat)){
//     return next(new AppError('user recently changed password ! Please login again ',401));
// };


// //Grant access to protected route

req.user =freshUser;

    
    next();
});


exports.restrictTo= (roles)=>{

    return (req,res,next)=>{


        //Roles is an array
        console.log('user role',req.user.role);


         
            if(!roles.includes(req.user.role)){
            
            return next(new AppError('You do not have permission to perform the action'),401);
            
        }
        console.log('roles',roles);
        
        
       
        next();
    }

}


exports.forgetpassword =catchAsync(async(req,res,next)=>{

//Get user based on posted email
const user =await User.findOne({email: req.body.email});

if (!user){

    return next(new AppError('There is no user with email address ',404)); 
}



//2 generate the random reset token "
// 
const resetToken=user.createPasswordResetToken();
await user.save({ validateBeforeSave: false});
//3 send it to user email


const resetURL=`${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}}`;

const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't request a password reset, please ignore this email.`;

try{
    await sendEmail({
        email:user.email,
        subject:'Your password reset token valid for 10 min',
        message
        
        })
        
        res.status(200).json({
            status:"success",
            subject:'Token is send to email'
        });

}catch(err){

    user.createPasswordResetToken=undefined;
    user.passwordResetExpires=undefined ;
    await user.save({ validateBeforeSave :false});
return next (new AppError('there is erorr',500))

    }






})

exports.resetpassword=catchAsync(async(req,res,next)=>{}

)
