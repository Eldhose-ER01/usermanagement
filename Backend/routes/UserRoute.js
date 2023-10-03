const express=require('express')
const userRoute=express()
const userController=require('../controller/userController')
const middleware=require('../middleware/userVerifyToken')
const multer = require("multer");

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../public/profileImage"),function(error,success){
            if(error){
                console.log(error)
            }
        })
    },
    filename:function(req,file,cb){
        const name=Date.now+"-"+filename.originalname;
        cb(null,name,function(error,success){
            if(error){
                console.log(error);
            }
        })
    }
})
const upload=multer({storage:storage})




userRoute.get('/test',middleware.VerifyToken)
userRoute.post('/signup',userController.userlist)
userRoute.post('/login',userController.userlogin)
userRoute.post('/check-if-user',userController.checkUser)
userRoute.get('/profile',userController.userprofile)
userRoute.post('/updateProfile',middleware.VerifyToken,userController.editUser)

userRoute.get('/checkIfUser',userController.checkIfUser)


module.exports= userRoute
