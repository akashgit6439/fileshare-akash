const express=require("express");
const connectDB = require("./config/db");
const path=require("path");
const app=express();

const port=process.env.PORT || 3000;

app.use(express.static('public'));

app.use(express.json());

//database connection
connectDB();

//template engine

app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');

//routes

app.get('/',(req,res)=>{
   res.render('home');
});

app.use('/files',require("./routes/files"));
app.use('/files',require("./routes/downloadpage"));
app.use('/files/download',require("./routes/download"));
app.use('/files/api',require("./routes/email"));

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});