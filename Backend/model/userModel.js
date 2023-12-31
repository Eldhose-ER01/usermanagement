const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
status:{
    type: Boolean,
    default: true,
},
phone: {
    type: Number,
    required: true,
},
password:{
    type:String,
    required:true
},
image:{
    type:String
}

})
module.exports=mongoose.model("user",userSchema)