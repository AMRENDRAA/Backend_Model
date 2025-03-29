const mongoose=require('mongoose');

const tourSchema= new mongoose.Schema({

    name:{
        type:String,
        required :[true,'A TOUR MUST HAVE A NAME'],
        unique: true,
        maxlength:[40,'Cannot exceed 40 chars'],
        minlength:[5,'Minimum 10 characters required ']
    
    },
    durations:{
        type:Number,
        required :[true, 'A TOUR SHOULD HAVE DURATION']
    },
    maxgroupsize:{

        type:Number,
        required:[true,'A tour must have a group size']
    },
    difficulty:{

        type:String,
        required:[true,'A tour must have a difficuty ']
    },

   
    ratingsAverage :{
        type:Number,
        default:4.5,
        min :[1,'Rating must be greater than 1'],
        max :[5,'Rating must be less than 6']
    },

    price :{
        
        type:Number,
        required:[ true,'A tour price should be there ']
    },
    priceDiscount :{
        type:Number,
        validate :{
            validator:function(val){
                console.log(val,this.price)
                if (val < this.price)
                    return "Discount price cannot be less than price "
                

            },
            message:'Discount price(VALUE) should be below price'
            
        }
    },
    summary:{
        type:String,
        trim:true  
    },
    description:{
        type:String,
        trimn:true
    },
    imagecover:{
        type:String,
        required:[true,'A tour must have a cover image ']
    },
    images:[String],
    createAt:{
        type:Date,
        default: Date.now()
    },
    startDates:[Date]
});

tourSchema.pre('save', function (next) {
    if (this.priceDiscount >= this.price) {
        next(new Error('Discount price should be below the original price.'));
    } else {
        next();
    }
});

const Tour=mongoose.model('tours',tourSchema);
module.exports=Tour;