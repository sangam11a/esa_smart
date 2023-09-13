const mongoose = require('mongoose')

const deviceSchema = new mongoose.Schema({
    email:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    mac_address : {
        type : String,
        required : true
    },
    device_name : {
        type : String,
        required : true
    },
    roles : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    active_status:{
        type : Boolean,
        default: false
    }
})

module.exports = mongoose.model('Devices',deviceSchema)