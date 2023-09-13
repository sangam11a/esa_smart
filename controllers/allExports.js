const express = require('express')
exports.express
exports.app = express()
exports.Router = express.Router()
exports.mongoose = require('mongoose')
// const moment = require('moment-timezone')
// exports.dateKathmandu = moment.tz(Date.now(),"Asia/Kathmandu")
exports.dateKathmandu = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
});
const jwt=require('jsonwebtoken')
exports.authenticateToken=(req, res, next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if(token == null){
        return res.status(404).send("not auth")
    }
    const secret_key='9f0bc362bfa13e6a50c9b38906adb99f562fc854dea94a317bfc823589de7658d94099b7cfd8ca4d31a1960ee1adb473febc15bf955e91bbddcadedc255238a5'
    jwt.verify(token,secret_key,(err,user)=>{
        if (err) return res.sendStatus(403)
        req.user = user
        next() 
    })
}
// module.exports = {authenticateToken}
// const utc = new Date()
// utc.setHours(utc.getHours()+5);
// utc.set