const User = require('../models/User')
const Data = require('../models/Data.js')
const Devices = require('../models/Devices')
const Home = require('../models/Home')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const chooseModel = require('./chooseModel')
const mongoose = require('mongoose')
const url= 'mongodb://127.0.0.1:27017/'
const LogsModel = require('../models/logsModel')
const {insertToTable,putToTable,patchToTable,deleteFromTable,getFromTable} = require('../controllers/tableController')
require('../models/User')

async function main(mongoDB){
    await mongoose.connect(mongoDB)
    .then(()=>{console.log(`connected to ${mongoDB}`)}).catch(()=>{
        console.log("connection failed")
    })
}

async function getAllUsers(req,res){
    const model = chooseModel(req.route.path.split("/")[2])
    console.log(`The selected db is ${req.route.path.split("/")[2]}`)
    const mongoDB = url + req.params.db;
    const success = await getFromTable(model,mongoDB)
     if(success){
        if (req.accepts('json')){
            res.json(success)
        }
        // else{
        //     res.send(`${(success)}`)
        // }
        //  res.send(`Data successfully populated to the table. ${JSON.stringify(success)}`)
         const logsData = {
            "ipAddress":req.ip,
            "request":req.method,
            "route":req.url
         }
         main(mongoDB)
         const logs = insertToTable(LogsModel,logsData,mongoDB);
     }
     else{
         res.send("Error occured");
     }
    
}




async function createNewUser(req,res){    
    const model = chooseModel(req.route.path.split("/")[2])    
    console.log(`The selected db is ${req.route.path.split("/")[2]}`)
    // console.log(req)

    const data=req.body;
    let cookies
    // if(req.route.path.split("/")[2]=="login"){
    //     const getData=generateToken(data.email)
    //     cookies=getData[0]
    //     res.cookie('jwt',getData[0],{httpOnly:true,maxAge:24*60*60})
    //     data["refreshToken"]=getData[0];
    // }
    // data["authToken"]
    const mongoDB = url + req.params.db; 
    console.log(mongoDB)   
    main(mongoDB)
    const success = await insertToTable(model,data,mongoDB)
     if(success){
        if (req.accepts('json')){
            // if(req.route.path.split("/")[2]=="login"){
            //     res.json(cookies)
            // }
            // else{
            res.json(`{"message":"success"}`)}
                 // }
        else{
            res.send(`success`)
        }
         const logsData = {
            "ipAddress":req.ip,
            "request":req.method,
            "route":req.url
         };
         main(mongoDB)
         const logs = insertToTable(LogsModel,logsData,mongoDB);
     }
     else{
         res.send("Error occured");
     }
    
}

async function Patch(req,res){
    
    try
        {const model = chooseModel(req.route.path.split("/")[2])
        console.log(`The selected db is ${req.route.path.split("/")[2]}`)
        const data=req.body;
        console.log(`data`,req)
        const mongoDB = url + req.params.db;
        const id = req.params.id
        // const id = 
        const success = await patchToTable(model,data,mongoDB,id)
        //  disconnect()
        if(success){
            if (req.accepts('json')){
                res.json({"message":"success"})
            }
            else{
                res.send(`success`)
            }
            const logsData = {
                "ipAddress":req.ip,
                "request":req.method,
                "route":req.url
            }
            main(mongoDB)
            const logs = insertToTable(LogsModel,logsData,mongoDB);
        }
        else{
            res.send("Error occured");
        }
    }
    catch(e){
        console.log(e);
        res.sendStatus(400);
    }
    
}


async function Put(req,res){
    
    const model = chooseModel(req.route.path.split("/")[2])
    console.log(`The selected db is ${req.route.path.split("/")[2]}`)
    const data=req.body;
    const mongoDB = url + req.params.db;
    const id = req.params.id

    const success = await putToTable(model,data,mongoDB,id)
     if(success){
          if (req.accepts('json')){
            res.json({"message":"success"})
        }
        else{
            res.send(`success`)
        }
        const logsData = {
            "ipAddress":req.ip,
            "request":req.method,
            "route":req.url
         }
         main(mongoDB)
         const logs = insertToTable(LogsModel,logsData,mongoDB);
     }
     else{
         res.send("Error occured");
     }
    
}


async function Delete(req,res){
    
    const model = chooseModel(req.route.path.split("/")[2])
    console.log(`The selected db is ${req.route.path.split("/")[2]}`)
    const data=req.body;
    const mongoDB = url + req.params.db;
    const id = req.params.id
    const success = await deleteFromTable(model,id,mongoDB)
     if(success){
        if (req.accepts('json')){
            res.json({"message":"success"})
        }
        else{
            res.send(`success`)
        }
     }
     else{
        if (req.accepts('json')){
            res.json({"message":"error"})
        }
        else{
            res.send(`error`)
        }
     }
    
}

module.exports = {getAllUsers,createNewUser,Put,Patch,Delete}