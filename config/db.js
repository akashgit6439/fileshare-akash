const mongoose=require("mongoose");
require('dotenv').config();


function connectDB(){

   mongoose.connect(
    process.env.MONGOURL
    ,
    {
          useNewUrlParser:true,
          useUnifiedTopology:true,
          useCreateIndex:true,
          useFindAndModify:true
    });

    const connection=mongoose.connection;

    connection.once('open',()=>{
       console.log('database connected.');
    }).catch(err=>{
       console.log('connection failed.');
    });
}

module.exports=connectDB;