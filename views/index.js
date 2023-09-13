require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const jwt = require('jsonwebtoken')
const posts = [{
    username:'sangam',
    title:'post1'
},
{
    username:'sangam2',
    title:'post11'
}]

app.get('/posts',authenticateToken,(req,res)=>{
res.json(req.user.user)
// posts.filter(post=>post.username === req.user.name)
})

app.post('/login',(req,res)=>{
    // res.json()
    const username = req.body.username
    const user = {user:username}
    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15s'})
    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'60m'})
    res.json({
        accessToken:accessToken,
        refreshToken:refreshToken
    })
})

function authenticateToken(req,res,next)
{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
console.log(authHeader)
console.log(token)
    if(token == null){
        return res.sendStatus(401)
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403)
         req.user = user
        next()
    })
}


app.listen(3000)