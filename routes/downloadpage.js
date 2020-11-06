const router=require('express').Router();
const File=require("../models/file");


router.get('/:uuid',async(req,res)=>{
     
    try{
      const file=await File.findOne({uuid:req.params.uuid});
       
      if(!file){
          return res.render('download',{error:"Link has been expired"});
      }
      
      const link=`${process.env.APP_BASE_URL}/files/download/${file.uuid}`;
      return res.render('download',{
          uuid:file.uuid,
          filename:file.filename,
          size:file.size,
          downloadlink:link
      });

    }catch(err){
       res.render('download',{error:err});
    }

});





module.exports=router;