const express = require('express')
const app = express()
const url= 'mongodb://127.0.0.1:27017/'
const jwt = require('jsonwebtoken')
const chooseModel = require('./chooseModel')
const {insertToTable,putToTable,patchToTable,deleteFromTable,getFromTable} = require('./tableController')
// const LogsModel = require('../model/logsModel')
// const LoginModel = require('../model/loginModels')
const User = require('../models/User')
const {mongoose} = require('../controllers/allExports')



function generateToken(user){
    const authToken = jwt.sign(user,secret_key,{expiresIn:'600s'});
    const refreshToken = jwt.sign(user,secret_key,{expiresIn:'172800s'});
    return [refreshToken,authToken];
}


async function main(mongoDB){
    await mongoose.connect(mongoDB)
    .then(()=>{console.log("connected")}).catch(()=>{
        console.log("connection failed")
    })
}
require('dotenv').config();


async function Post(req,res){    
    const model = chooseModel(req.route.path.split("/")[2])    
    console.log(`The selected db is ${req.route.path.split("/")[2]}`)
    // console.log(req)

    const data=req.body;
    let cookies
    if(req.route.path.split("/")[2]=="login"){
        const getData=generateToken(data.email)
        cookies=getData[0]
        res.cookie('jwt',getData[0],{httpOnly:true,maxAge:24*60*60})
        data["refreshToken"]=getData[0];
    }
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


async function Get(req,res){
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

async function Login(req,res){
    // const model = LoginModel
    const data = req.body
    const mongoDB = url + req.params.db;
    const success = await getFromTable(LoginModel,mongoDB,data)
    if(!success){
        
        // return {"success":`User ${user} is logged in!`}
        return {"message":"Error"}
    }
    else{
        // authenticateToken()
        if(data.email==success.email&&data.password==success.password){
            res.sendStatus(200);
        }
        console.log("success",success)
        console.log('email',data.email==success.email)
        console.log('pass',data.password==success.password)
    }
}

async function GetById(req,res){
    
    const model = chooseModel(req.route.path.split("/")[2])
    console.log(`The selected db is ${req.route.path.split("/")[2]} getb id`)
    // const data=req.body;
    let data = {}
    const mongoDB = url + req.params.db;
    const id = req.params.id;
    console.log("index id called",req.url.split("?"))
    const par = req.url.split("/")[3]
    console.log(par)
    if (par.indexOf("=")==-1){
        data["_id"] = id       
    }
    else{
        data [par.split("=")[0]]= par.split("=")[1]
    }
    console.log("data is",data)
    const success = await getFromTable(model,mongoDB,data)
    console.log("success",success)
    data={}
     if(success){
        if (req.accepts('json')){
            res.json(success);
        }
        // else{
        //     res.send(`${success}`)
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
module.exports = {Get,Post,Put,Patch,Delete,GetById,Login}