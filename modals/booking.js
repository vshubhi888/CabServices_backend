const mongoose =require('mongoose');
const bookingSchema= new mongoose.Schema({
    employee:{ type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    driver:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    pickupLocation:{
        address:String,
        lat:Number,
        lng:Number
    },
    dropLocation:{
        address:String,
        lat:Number,
        lng:Number
    },
    status:{
        type: String,
        enum:['pending','accepted','enroute','completed','cancelled'],
        default:'pending'
    },
    bookingTime:{type:Date,default:Date.now},
    tripStartTime:Date,
    tripEndTime:Date,
    estimatedFare:Number,


    });
    module.exports=mongoose.model('Booking',bookingSchema);
