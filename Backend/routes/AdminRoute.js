const express=require('express')
const adminRoute=express()
const adminController=require('../controller/adminController')
const middleware=require('../middleware/userVerifyToken')


adminRoute.post('/login',adminController.adminlogin)
adminRoute.post('/verify',adminController.verifyadmin)
adminRoute.get('/uerlists',adminController.userlists)
adminRoute.get('/block',adminController.block)
adminRoute.post('/delete',adminController.deleteuser)
adminRoute.post('/adduser',adminController.adduser)

module.exports=
    adminRoute
