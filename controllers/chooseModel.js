// const LogsModel = require('../model/logsModel')

const chooseModel=(val)=>{    
    const Data = require('../models/Data')
    const Devices = require('../models/Devices')
    const Home = require('../models/Home')
    const User = require('../models/User')
    const LogsModel = require('../models/logsModel')
    switch(val){
        case 'datas':return  Data
                        break;
        case 'devices': return Devices
                        break;
        case 'homes': return Home
                        break;
        case 'users':return User
                        break;
       
        default:return LogsModel;break;
    }
}
module.exports = chooseModel