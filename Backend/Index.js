const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')



app.use(cors());
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/React').then(()=>{
    console.log("iiiiiii DB CONNECTED");
})



app.use(cors({
    origin:'http://localhost:3000',
    methods:['GET','POST','PUT','PATCH','DELETE'],//ALLOW SPECIFIC METHOD
    // credentials:true,//allow cookies and authentications headers
}))

app.use('/',require('./routes/UserRoute'))
app.use('/admin',require('./routes/AdminRoute'))

app.listen(5000,()=>{
    console.log("working");
})
