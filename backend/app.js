const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
var Request = require("request");
var cors = require('cors');
app.use(cors({origin: 'http://localhost:8081'}));
app.use(bodyParser.json())
require('./app/routes/currency.routes.js')(app);
require('./app/routes/notification.routes.js')(app);
const Currency = require('./app/models/currency.model.js');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');




let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'xxxxxxxxxxxxxxxxxxx@gmail.com',
        pass: 'yyyyyy@'
    },
    tls:{
      rejectUnauthorized:false
    }
  });


var allData = []
var gv_allsymprice = {};
var allUsersData = []

updatesymprices();
function updatesymprices(){
    getallsymbolsprices();
    setTimeout(updatesymprices,4*1000);
}




function getallsymbolsprices(){
  Request.get("https://api.binance.com/api/v3/ticker/price", (error, response, body) => {
      if(error) {
          return console.dir(error);
      }
      var gv_allsymprice_l = {};
      ourDatax = JSON.parse(body);
      for(k=0;k<ourDatax.length;k++){
          gv_allsymprice_l[ourDatax[k]["symbol"]] = ourDatax[k]["price"];
      }
      gv_allsymprice = gv_allsymprice_l;
      // res.send('hello')
  });
}



genalerts();

function genalerts(){
    generatealerts();
    setTimeout(genalerts,4*1000);
}

function generatealerts(){

  Currency.find({alert: false})
    .then(currencys => {
      allUsersData = currencys
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving currencys."
        });
    });
    allUsersData.map(a => {
      var fp1,fp2,fp;
      var currencytype = 'USDT'
      if(a.currency.substr(a.currency.length - 4, a.currency.length) == 'USDT'){
         fp1 = gv_allsymprice[a.currency];
         fp2 = 1;
       } else{
         fp1 = gv_allsymprice[a.currency];
         fp2 = gv_allsymprice[a.currency.substr(a.currency.length - 3, a.currency.length) + 'USDT'];
      }
      fp = fp1*fp2
      if(fp >= a.priceLimit){
        sendsms (a.contactNo)
        sendemail (a.email)
        updatedc (a._id)
         console.log('Price of is greater than ');
       }

    })
}


Request.get("https://api.binance.com/api/v3/ticker/price", (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    allData = body
    return "allData"
    // res.send('hello')
});

function updatedc (id) {

  Currency.findByIdAndUpdate(id, {
      alert: true
  }, {new: true})
  .then(currency => {
      if(!currency) {
          console.log('not currency types')
      }
      res.send(currency);
  }).catch(err => {
      console.log(err)
  });

}


function sendsms (contactNo) {

  const accountSid = 'sid';
  const authToken = 'token';
  const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({
       body: 'Price is higher check your exchange',
       from: '+12056078253',
       to: contactNo
     })
    .then(message => console.log(message.sid)).catch(err => console.log(err));
}


function sendemail (recieverMail) {

  let mailOptions = {
      from: '"priceExchange Contact" <thepdppdp@price.exchange>',
      to: recieverMail,
      subject: 'Node Contact Request',
      text: 'Hello world?',
      html: '<div><h1>Hello</h1></div>'
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });

}

app.get('/getallcurrency', (req, res) => {
  res.send(allData)
})
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
