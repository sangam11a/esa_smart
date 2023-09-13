const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email:{
        type : String,
        required: true,
    },
    password: {
        type : String,
        required : true
    },
    roles:{
        type : String,
        default : "Owner"
    },
    active:{
        type : Boolean,
        default : false
    },
    token:{
        type : String,
        default : "0"
    }
    // 

})

module.exports = mongoose.model('User',userSchema)