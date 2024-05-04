let mongoose = require('mongoose');

let record = new moongoose.Schema({
    type : {type:String},
    amount: {type:Number},
    description: {type:String}
})

let Recod = mongoose.model('Record',record)

model.exports = Record