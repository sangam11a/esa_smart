const mongoose = require('mongoose')
const dataSchema = new mongoose.Schema({
    mac_address:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Devices'
    },
    data:[{
        data_name  : {
            type:String,
            required : true
        },
        values : {
            type : String,
            required : true
        }
    }],
   
},{
    timestamps : true,
})

module.exports = mongoose.model('Data',dataSchema)