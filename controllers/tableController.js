//add table,edit table,delete table

const Data = require('../models/Data')
const Devices = require('../models/Devices')
const Home = require('../models/Home')
const User = require('../models/User')
const {mongoose,app} = require('./connectDB')
let mongoDB = ''


async function main(mongoDB){
    await mongoose.connect(mongoDB)
    .then(()=>{console.log("connected")}).catch(()=>{
        console.log("connection failed")
    })
}

async function insertToTable(model,data,mongoDB){
    const data1 = new model(data);
    let saved = false;
    main(mongoDB);
    console.log(typeof(model),data,data1);
    await data1.save()
    .then(()=>{
        // console.log(`New user ${data.email} has been added to Login Schema`);
        saved = true;
    })
    .catch((e)=>{
        console.log(`Some error has occured ${e}`);
        return saved;
    })
     
    return saved;
}

//put-replace and update=patch

async function patchToTable(model,data,mongoDB,Id){
    const data1 = new model(data) ;   
    main(mongoDB);
    let data2 = false
    let data3;
    await model.findByIdAndUpdate(Id,{ $set:data},{new:true})
    .then((data5)=>{console.log(`Updation successful`,data5,{$set:data});data2=true;})
    .catch((e)=>{console.log`Error : ${e}`});
    // console.log(data3)
    return data2
}

async function putToTable(model,data,mongoDB,Id){
    const data1 = new model(data) ;   
    let data2=false;
    main(mongoDB);
     await model.findByIdAndUpdate(Id,{$set : data},{new:true})
     .then((dt)=>{console.log(`Updation successful`,dt);data2=true;})
    .catch((e)=>{console.log`Error : ${e}`});    
    
    return data2;
}

async function deleteFromTable(model,data,mongoDB){
    // const data1 = new model(data)
    main(mongoDB);
    try{const data2 = await model.findByIdAndRemove(data)
        console.log(data2)
        if (data2==null)
            return false
        return true;
    }
    catch(e){
        console.log("delete",e)
        return false
    } 
    // return ;
}

async function getFromTable(model,mongoDB,data={}){
    const data1 = new model(data);
    main(mongoDB);
    try{
        const data2 = await model.find(data).exec();
        console.log("getting data",data2)//.then((d)=>console.log(d))
    // disconnect()
    return data2;
    }
    catch(e){
        console.log("error occured ");
        return false;
    }
}

// const getFromTable=()=>{}
module.exports = {insertToTable,putToTable,patchToTable,deleteFromTable,getFromTable}