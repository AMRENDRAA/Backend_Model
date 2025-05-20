const fs=require('fs');
const User=require('./../model/userModel');
const catchAsync=require('./../utils/catchAsync');
const AppError=require('./../utils/appError');


exports.getAllusers= async(req,res,next)=>{
const users= await User.find();
// send response 

res.status(200).json({
    status: 'success',

    results:users.length,
    data:{
        users  
    }
})



}
exports.createuser=(req,res)=>{
    res.status(500).json({

        status: 'error',
        message:'Inprogress'
    })
}
exports.getuser=(req,res)=>{
    res.status(500).json({

        status: 'error',
        message:'Inprogress'
    })
}

exports.updateuser=(req,res)=>{
    res.status(500).json({

        status: 'error',
        message:'Inprogress'
    })
}