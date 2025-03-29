
const app=require('./app');
const dotenv=require('dotenv');
dotenv.config({path :'./config.env'});
const mongoose=require('mongoose');
const Tour=require('./model/tourModel')

const DB=process.env.DATABASE;

mongoose.connect(DB,{

    useNewUrlParser :true,
    useCreateIndex: true,
    useFindAndModify:false,
    useUnifiedTopology: true
}).then(con=>{
    // console.log(con.connections);
    console.log('running fine');
});




// const testtour=new Tour({

//     name:'The forest thid',
//     rating :4.7,
//     price:497
// });

// testtour.save().then(doc=>{
//     console.log(doc);
// }).catch(err=>{
//     console.log('Error *:',err);
// })






const port =process.env.PORT ||3000;
app.listen(port ,()=>{

    console.log(`app running on ${port} port .....`);

})