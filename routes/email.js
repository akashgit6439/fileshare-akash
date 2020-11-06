const router=require("express").Router();
const File=require("../models/file");


router.post('/send',async(req,res)=>{

    const {uuid,emailTo,emailFrom}=req.body;

    if(!uuid || !emailFrom || !emailTo){
        return res.status(422).json({error:"all fields are required"});
    }

    const file=await File.findOne({uuid:uuid});

    if(file.sender){
         return res.status(422).json({error:"email already sent"});
    }

    file.sender=emailFrom;
    file.reciever=emailTo;

    const response= await file.save();

    //send email

    const sendmail=require('../services/emailservice');

    sendmail({
    
      from:emailFrom,
      to:emailTo,
      subject:'file share',
      text:`${emailFrom} shared file with you`,
      html:require("../services/emailtemplate")({
        
        emailFrom:emailFrom,
        downloadlink:`${process.env.APP_BASE_URL}/files/${file.uuid}`,
        size:parseInt(file.size/1000)+' KB',
        expires:'24 hours'
      })
    });

    return res.status(200).json({success:"true"});

});




module.exports=router;