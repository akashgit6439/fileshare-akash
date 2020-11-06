const router=require("express").Router();
const multer = require('multer');
const path = require('path');
const {v4:uuid4} = require('uuid');
const File=require("../models/file");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        const uniquename=`${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        cb(null,uniquename);
    }
});

let upload=multer({
    storage,
    limit:{fileSize:1000000*500},
}).single('myfile');


router.post('/',(req,res)=>{
//store file
upload(req,res,(err)=>{
   
    //validate request
    if(!req.file){
        return res.json({error:"please upload file"});
    }

    if(err){
         return res.json({error:err.message});
    }
  //store to database
   const file = new File({
       filename:req.file.filename,
       uuid:uuid4(),
       path:req.file.path,
       size:req.file.size
   });

   file.save((err,response)=>{

    if(err){
     return res.status(400).json({error:err});
    }

     return res.json({downloadpage:`${process.env.APP_BASE_URL}/files/${response.uuid}`});

  });

 

});


});


module.exports=router;