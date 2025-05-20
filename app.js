const fs = require('fs');
const express =require('express');
const app=express();
const morgan =require('morgan');
const tourRouter=require('./routes/tourRoutes');
const userRouter=require('./routes/userRoutes');
//const { signup, login } = require('./controller/authController');
const AppError=require('./utils/appError');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
console.log(app.get('env'));
console.log(process.env);





//MIDDLEWARE 


app.use((req,res,next)=>{
    console.log('hello middle ware');
    next();
})

app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString();
    console.log(req.headers);
    next();
})






// app.get('/api/v1/tours',getalltour);



// app.post('/api/v1/tours',createTour);
// app.get('/api/v1/tours/:id',gettour);

// app.patch('/api/v1/tours/:id',updatecreatetour);

// const router=express.Router();

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);
// app.use('/api/v1/signup',signup);
// app.use('/api/v1/login',login);
app.use("*",(req,res,next)=>{

    // res.status(400).json({
    //     status:"Failed",
    //     message:`Invalid URL:${req.orginalUrl}`
    // })
  
    next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));

})
app.use((err,req,res,next)=>{
err.statusCode= err.statusCode ||500;
err.status=err.status || 'error'

res.status(err.statusCode).json({
    status:err.status,
    message:err.message
})

})

// router.route('/').get(getalluser).post(createuser);

// router.route('/:id').get(getuser).patch(updateuser);


module.exports=app;







