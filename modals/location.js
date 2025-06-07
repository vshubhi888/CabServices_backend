const mongoose= require('mongoose');
const locationSchema = new mongoose.Schema ({
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    locaton: {
        lat:Number,
        lng:Number
    },
    timestamp:{type: Date, default : Date.now},

});
module.exports =mongoose.model('LocationUpdate', LocationSchema);

