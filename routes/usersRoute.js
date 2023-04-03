const express=require("express");
const {User}=require("../modal/usermodel");
const bcrypt = require('bcrypt');

const usersRoute=express.Router();

usersRoute.post("/signup",async(req,res)=>{

    const {email,password}=req.body; 
    console.log(email,password)   
   try{
        
   let exist=await User.findOne({email:email});

   if(exist){
    res.send({msg:"user already registered please signin"});
   }
   else{

    bcrypt.hash(password, 5, async function(err, hash) {
        
        if(err){
            res.send(err);
        }

        else{

            const user=new User({email,password:hash,login_attempts:0,lock:null});

            await user.save();
            res.send({msg:"user registered successfully"});
        }
    });

   }

   }
   catch(err){
    console.log(err);
   }
})
usersRoute.post("/login",async(req,res)=>{

    const {email,password}=req.body;

    try{
        const user=await User.find({email:email});
        
        if(user.length>0){
            if(user[0].login_attempts<=5 && user[0].lock<=24){

            bcrypt.compare(password, user[0].password, async(err,result)=> {
                if(result){
                    await User.findByIdAndUpdate(user[0]._id,{login_attempts:0,lock:null})
                    res.send({msg:"Login Successful",email:user[0].email})
                }
                else{

                    await User.findByIdAndUpdate(user[0]._id,{login_attempts:user[0].login_attempts+1})
            
                    if(user[0].login_attempts>=5){
                        const d= 1000*60*60*24;
            
                        const lt=new Date().getTime() + d;
            
                        await User.findByIdAndUpdate(user[0]._id,{lock:new Date(lt)});   
                    }
                    res.send({msg:"Login Failed, plz enter correct credintials"});
                }
            });
        }
        else{
            let time=24;
            await User.findByIdAndUpdate(user[0]._id,{lock:time})

            res.send({msg:`U have been blocked for 24 hours} `})
        }
    }
    else{
        res.send({msg:"U r not user please login first"})
    }
}
    catch(err){
        res.send(err);
    }
})



module.exports={usersRoute};