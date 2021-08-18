const express = require('express');
const app = express();
const path = require('path');
let bodyParser = require('body-parser')
const User = require('./model/model')
let cors = require('cors')
let mongoose = require('mongoose');


require('dotenv').config()

const url = process.env.URL

mongoose.connect(url,  { useUnifiedTopology: true,  useNewUrlParser: true })
    .then((data) => console.log('connected to database successfully'))
    .catch(err => console.log(err))


const PORT = process.env.PORT || 3000;


let urlencodedParser = bodyParser.urlencoded({ extended: false})

app.use(cors())
//set static folder
app.use(express.static(path.join(__dirname, 'public')))


app.post('/send',urlencodedParser, (req, res)=>{
  console.log(req.body)
  const user = new User(req.body)
  user.save((err, user) => {
      if(err){
         console.log(err)
         return res.send({message: err})
      }
         
      return res.send({message: 'successful'})
      

})

})


app.get('/results', (req, res)=>{
    User.find((err, user) => {
      if(err)
          return res.send({err})
      return res.send({message: 'successful', user})
  })
})





app.listen(PORT, ()=> {
    console.log('we working!!!')
})

