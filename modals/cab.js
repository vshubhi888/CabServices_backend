const mongoose= require('mongoose');
const cabSchema = new mongoose.Schema ({
    name:{ type: String, required: true },
    vehcileNumber : {type: String,required  :true},
    driverName: { type: String, required: true },
    driverContact: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    model: String,
    capacity :{type: Number, default :4},
    CurrentLocation: {
        lat:Number,
        Lng:Number
    

    }
});
module.exports = mongoose.model('Cab', cabSchema, 'cab'); // Explicitly set the collection name to 'cab'
// This ensures that the model uses the 'cab' collection in MongoDB