const { query } = require('express');
const Tour=require('./../model/tourModel')
const fs= require('fs');



exports.checkbody=(req,res,next)=>{

  
    
    next();
}
exports.getalltour= async(req,res)=>{

    try {
        //build query
        const queryObj={...req.query};
      
        // queryObj.price.gt=parseInt(queryObj.price.gt);
        console.log('we are here 1',queryObj);
        const excludedfields=['page','sort','limit','fields'];
        excludedfields.forEach(el=> delete queryObj[el]);
        console.log(req.query,queryObj);

        let queryStr=JSON.stringify(queryObj);

         queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
        console.log(queryStr);

        console.log('we are here2 ',JSON.parse(queryStr));



        // let query = await Tour.find(JSON.parse(queryStr)); // Corrected this line

        // if (req.query.sort){
        //     // const sortBy = req.query.sort.split(',').join(' '); // Support for multiple sorting criteria
        //     // query = query.sort(req.query.sort);
        //     const {sort}=req.query;
        //     const tours = await Tour.find().sort({ sort: -1 });
        //    return  res.status(200).json({

        //         data:tours
        //     })
           
        // }


        if (req.query.fields) {
            console.log('we are here in fields ');
            const fields = req.query.fields.split(',').join(' '); // Fix: Space instead of empty string
            query = query.select(fields);
        } else {
            console.log('we are here 2');
            query = query.select('-__v'); // Fix: Probably meant to exclude `__v`
        }
        



       
        //Executing query 

        const tours =await query;
        res.status(200).json({
            status: "success",
            requestedAt: req.requestTime,
            data: { tours }
        });
    } catch (err) {
        res.status(404).json({
            status: "Failed",
            message: err.message
        });
    }
  
    
}


exports.gettour=async(req,res)=>{

    try{
        const tour=await Tour.findById(req.params.id);
        res.status(200).json({
            status:"success",
            data:{
                tour
            }
        })

    }catch(err){
        res.status(404).json({
            status: "Failed",
            message: err.message

    })
}
}

    


    exports.createTour=async(req,res)=>{

        try{
            const newTour=await Tour.create(req.body)

            res.status(201).json({
            
                status:"success",
                data:{
                    tour: newTour
                }
            });

            
        }catch(err){
            console.log(err);
            res.status(400).json({
                status:'fail',
                message:err.message
            })
        }
  

};



exports.updatecreatetour =async (req,res)=>{

    try{
        
const tour= await Tour.findByIdAndUpdate(req.params.id,req.body, {

    new :true,
    runValidators:true

 
});
res.status(200).json({
    status:'success',
    data:{
        tour
    }
})

}catch(err){

    res.status(404).json({
        status:'Failed',
        message:err
    })
}

   
}

exports.getalluser=(res,req)=>{
    res.status(500).json({
        status:'error',
        message :'Inprogress'
    })

}