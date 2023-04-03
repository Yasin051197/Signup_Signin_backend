const {connection}=require("./config/db");
const cors=require("cors")

const express=require("express");
const { usersRoute } = require("./routes/usersRoute");




const app=express();

app.use(express.json())

app.use(cors({origin:"*"}))
app.use("/user",usersRoute);



app.get("/",(req,res)=>
{
    res.send("Welcome to server")
})


app.listen(8080,async()=>{

    try{
         await connection;
         console.log("connected");
    }
    catch(err){
        console.log(err);
    }

    console.log("server is running on 8080")
})