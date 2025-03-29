const fs = require('fs');
const express =require('express');
const app=express();
const morgan =require('morgan');
const tourRouter=require('./routes/tourRoutes');
const userRouter=require('./routes/userRoutes');

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
    next();
})






// app.get('/api/v1/tours',getalltour);



// app.post('/api/v1/tours',createTour);
// app.get('/api/v1/tours/:id',gettour);

// app.patch('/api/v1/tours/:id',updatecreatetour);

// const router=express.Router();

app.use('/api/v1/tours',tourRouter);


app.use('/api/v1/users',userRouter);
app.use("*",(req,res,next)=>{

    res.status(400).json({
        status:"Failed",
        message:`Invalid URL:${req.orginalUrl}`
    })
})


// router.route('/').get(getalluser).post(createuser);

// router.route('/:id').get(getuser).patch(updateuser);


module.exports=app;







