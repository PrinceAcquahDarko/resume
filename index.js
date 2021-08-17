const express = require('express');
const app = express();
const path = require('path');
const nodemailer = require('nodemailer')
let bodyParser = require('body-parser')

require('dotenv').config()


const PORT = process.env.PORT || 3000;


let urlencodedParser = bodyParser.urlencoded({ extended: false})


//set static folder
app.use(express.static(path.join(__dirname, 'public')))


app.post('/send',urlencodedParser, (req, res)=>{
    console.log(req.body)

    const output = `
        <p>You have a new contact reques</p>

        <h3>Contact Details</h3>

        <ul>
        <li>Name: ${req.body.fname}</li>
        <li>Email: ${req.body.email}</li>
        </ul>

        <h3>Message</h3>

        
        <p>${req.body.content}</p>
    `


      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });
    
      // send mail with defined transport object
      let info = {
        from: process.env.EMAIL, // sender address
        to: req.body.email, // list of receivers
        subject: "Resume", // Subject line
        text: "reached out on resume", // plain text body
        html: output, // html body
      };

      transporter.sendMail(info, (error,info) => {
          if(error){
              return console.log(error);
          }
          console.log(info)
          res.send('sent successfully thank you !!!')
      })
  
    })



app.listen(PORT, ()=> {
    console.log('we working!!!')
})