const express = require('express');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
// app.use(express.static("style"));
app.use(bodyparser.urlencoded({extended:true}));
const port = 6969;
const hostname = "127.0.0.1";

// app.use(express.static(path.join(__dirname ,+'public')));
app.get('/', (req, res) => {
     res.status(200).sendFile(__dirname + "/index.html");
     console.log(__dirname);
 });

 function connectDb(){
// Moongoose connecting Database without using async and await
// mongoose.connect("mongodb://127.0.0.1:27017/emailcheck")
// .then(()=> console.log("mongoDB connected"))
// .then(() => app.listen(port, () => console.log("server Started")))
// .catch((err)    => console.error(err));
 }

app.post('/', function(req, res)  {
    const comment = req.body.message;
    // console.log(comment);
    const useremail = req.body.nameofperson;
    const sendingemail = req.body.username;
    // Create a Nodemailer transporter using either SMTP 
    const transporter = nodemailer.createTransport({
        // host: "smtp.ethereal.email",
        service: "gmail",
        // port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//       from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//       to: "bar@example.com, baz@example.com", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: "<b>Hello world?</b>", // html body
//     });    

let mailOptions = {
    from:process.env.EMAIL_USER , // sender address
    to:process.env.EMAIL_USER,
    cc:'maddison53@ethereal.email',
    subject : `chat with someone ${req.body.nameofperson}`,
    text: `💓💓J1 Zal Ka 💓💓 Nice DP💑💑 ${ comment}`,
}
transporter.sendMail(mailOptions, function(err, info){
  if(err){
    console.log(err);
    
  }  else{
    res.redirect('/');
    console.log("Email Send" + info.response);
    
  }
})
})

app.listen(port, function(){
    console.log("server Connected 6969 ");
    
})