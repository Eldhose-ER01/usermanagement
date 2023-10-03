const express = require('express');
const app = express();
const User=require('../model/userModel.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { path } = require('../routes/UserRoute.js');

const userlist=async(req,res)=>{
    try {
        
       const{name,email,phone,password}=req.body
       console.log(email,email);
       const existsuser=await User.findOne({email:email})
       if(!existsuser){
        const hashpassword=await bcrypt.hash(password,10)
        const userdata=new User({name,email,phone,password:hashpassword})
       const saveData= await userdata.save()
        
        if(saveData){
            res.status(200).json({success:true,message:"registration successfully"})
        }else{
            res.status(401).json({success:false,message:"registration  failed"})
        }
       }else{
         res.json({errorMessage:"user alredy exixts"})

       }
        

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:"something went wrong"})

    }
}

const userlogin=async(req,res)=>{
    try {
        const { user } = req.body
            const logdata=await User.findOne({email:req.body.user.email})
        if(!logdata)
        {
            return res.status(200).send({ notExistuser: "User does not exsist", success: false })
        }
        if(logdata.status==false)
        {
         res.status(200).send({Block:"This Account is Block",success:false})
        }
        const userdata=bcrypt.compareSync(user.password,logdata.password)
        
        if(!userdata)
        {
            return res.status(200).send({ incorrectPassword: "Password is incorrect", success: false })
           
        }else{
        const KEY=process.env.JWT_SECRET_KEY
        const token=jwt.sign({id:logdata._id, name: logdata.name},KEY,{expiresIn:'5h'})
        const user={
            id:logdata._id,
            name:logdata.name,
            token
        }
           
        
        res.status(200).send({message:"login successfull",success:true,userdata:user})
       
        }
     
        
       
    } catch (error) {
        console.log(error.message);
    }
}

const checkUser=async(req,res)=>{
    try{
        const KEY=process.env.JWT_SECRET_KEY
        jwt.verify(req.body.token,KEY,(err,decode)=>{
            if(err){
                return res.status(401).send({
                    message:"Auth fail",
                    success:false
                })
            }else{
                const user={
                    id:decode.id,
                    name:decode.username
                }
                res.status(200).send({message:"user found",success:true,userdata:user})
            }
        })

    }catch(error){
        return res.status(401).send({
            message:"auth faild",
            sucess:false,error
        })
    }
}



const editUser = async (req, res) => {
    try {
  
      let Id=req.UserId
      let userdatas;
      if(req.body.image){
         userdatas=await User.findByIdAndUpdate({_id:Id},{$set:{
      
            name:req.body.name,
            email:req.body.email,
             phone:req.body.phone,
            image:req.body.image 
         } }
           );
      }else{
         userdatas=await User.findByIdAndUpdate({_id:Id},{$set:{
      
            name:req.body.name,
            email:req.body.email,
             phone:req.body.phone,
         } }
           );
      }
     
  
      if (userdatas) {
        return res.status(200).send({
          message: "User updated successfully",
          success: true,
          updatedUser: userdatas,
        });
      } else {
        res.status(401).send({
          message: "Error while updating",
          success: false,
        });
      }
    } catch (error) {
      console.error(error.message);
      res.status(401).send({
        message: "Error while updating",
        success: false,
        error: error.message, 
      });
    }
  };
  
const userprofile=async(req,res)=>{
    try {
      const token = req.query.id
          const tokenVerify = jwt.verify(token,process.env.JWT_SECRET_KEY)

        const finduser=await User.findOne({_id:tokenVerify.id})
        console.log(finduser);
        if(finduser)
        {
            res.status(200).send({message:"got it user data",success:true,user:finduser})
        }else{
            res.status(401).send({message:"user not found",success:true})
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "Error logging in", success: false, error })
    }
}


const checkIfUser=async(req,res)=>{
    try {
        const tokenWithBearer = req.headers['authorization'];
        const token = tokenWithBearer.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, encoded) => {
            if (err) {
                return res.status(401).send({ message: "Auth failed", success: false });
            } else {
                try {
                  const finduser=await User.findOne({_id:encoded.id})
                    const user={
                        token,
                        id:encoded.id,
                        name:finduser.name
                    }
                    res.status(200).send({ message: "Auth successful", success: true  ,data:user});
                } catch (error) {
                    console.log(error.message);
                    res.status(500).send({ message: "Something went wrong", success: false });
                }
            }
        });
    } catch (error) {
        console.log(error.message);
        
    }
}
module.exports={
    userlist,
    userlogin,
    checkUser,
    editUser,
    userprofile,
    checkIfUser
}
    