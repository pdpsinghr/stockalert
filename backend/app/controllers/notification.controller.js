const Currency = require('../models/currency.model.js');
const currency = require('../controllers/currency.controller.js');


exports.alertData = (req, res) => {
  console.log('values', req.params.id)
  var mobileno = ''
  var email = ''
  var values = app.get('/currency/:currency', currency.findOne);
  // Currency.findById(req.params.id)
  //   .then(currency => {
  //       if(!currency) {
  //           return res.status(404).send({
  //               message: "Currency not found with id " + req.params.currencyId
  //           });
  //       }
  //       mobileno = currency.contactNo
  //       email = currency.email
  //       return
  //       res.send(currency);
  //   }).catch(err => {
  //       if(err.kind === 'ObjectId') {
  //           return res.status(404).send({
  //               message: "Currency not found with id " + req.params.currencyId
  //           });
  //       }
  //       return res.status(500).send({
  //           message: "Error retrieving currency with id " + req.params.currencyId
  //       });
  //   });
};
