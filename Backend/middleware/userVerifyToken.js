const jwt = require('jsonwebtoken')
require('dotenv').config()

const VerifyToken= (req, res, next) => {
  const jwttoken = req.headers.authorization;
  let token = jwttoken.replace(/"/g, ''); 
  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(user,'user-------------------')
      req.UserId=user.id
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Token missing' });
  }
};

module.exports={VerifyToken};



// const express=require('express')
// const jwt = require('jsonwebtoken');
// const VerifyToken=(req,res,next)=>{
//     try{
//         console.log('hello im middleware');
//     // const token=req.headers[`authorization`];
//     const token=req.headers.authorization
//     console.log(token,`token -------------------`);
//     if(!token){
//         return res.status(401).json({
//             message:'Token is misssing'
//         })
//     }else{
//         let tokenRef=token.split('')[1];
//         const KEY=process.env.JWT_SECRET_KEY
//         jwt.verify(tokenRef,KEY,(err,encoded)=>{
//             if(err)
//             {
//                 return res.status(401).send({message:"Authentication faile",success:false})
//             }
//             else if(encoded.role=='user')
//             {

//                 req.id=encoded.id
//                 next();

//             }
            
//         })
//     }
//     }catch(error){
//         console.log(error.message);
//     }
    

// }
// module.exports={VerifyToken}