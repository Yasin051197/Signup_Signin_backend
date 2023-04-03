

const mongoose=require("mongoose");

const connection=mongoose.connect("mongodb://yasim:jamadar@ac-zicnd7k-shard-00-00.0njjond.mongodb.net:27017,ac-zicnd7k-shard-00-01.0njjond.mongodb.net:27017,ac-zicnd7k-shard-00-02.0njjond.mongodb.net:27017/company?ssl=true&replicaSet=atlas-6ighbh-shard-0&authSource=admin&retryWrites=true&w=majority")

module.exports={connection};