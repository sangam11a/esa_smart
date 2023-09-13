const mongoose = require('mongoose')

const AutoIncrement = require('mongoose-sequence')(mongoose)

const homeSchema = new mongoose.Schema({
    email:{
        type:mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    home:[{
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
        home_name:{
            type:String
        }
    }]
})

homeSchema.plugin(AutoIncrement,{
    inc_field:'S.N',
    id : 'symbolNum',
    start_seq : 1
})
module.exports = mongoose.model("Home",homeSchema)