const mongoose = require('mongoose')
const dateKathmandu = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
});
const LogsSchema = new mongoose.Schema({
    ipAddress:{
        type : String,
        required : true
    },
    request:{
        type : String,
        required : true
    },
    route:{
        type : String,
        required : true
    },
    created_date:{
        type : Date,
        default : dateKathmandu
    }
})

const LogsModel = mongoose.model("LogsModel",LogsSchema)
module.exports = LogsModel