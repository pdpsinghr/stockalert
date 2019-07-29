const Currency = require('../models/currency.model.js');

exports.create = (req, res) => {
    const currency = new Currency({
        email: req.body.email,
        contactNo: req.body.contactNo,
        currency: req.body.currency,
        priceLimit: req.body.priceLimit
    });
    currency.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Currency."
        });
    });
};

exports.findAll = (req, res) => {
  Currency.find()
    .then(currencys => {
        res.send(currencys);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving currencys."
        });
    });
};

exports.findOne = (req, res) => {
  Currency.findById(req.params.currencyId)
    .then(currency => {
        if(!currency) {
            return res.status(404).send({
                message: "Currency not found with id " + req.params.currencyId
            });
        }
        res.send(currency);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Currency not found with id " + req.params.currencyId
            });
        }
        return res.status(500).send({
            message: "Error retrieving currency with id " + req.params.currencyId
        });
    });
};

exports.update = (req, res) => {
  if(!req.body.currency) {
       return res.status(400).send({
           message: "Currency content can not be empty"
       });
   }

   // Find currency and update it with the request body
   Currency.findByIdAndUpdate(req.params.currencyId, {
       email: req.body.email || "Untitled Currency",
       contactNo: req.body.contactNo,
       currency: req.body.currency,
       priceLimit: req.body.priceLimit,
       alert: true
   }, {new: true})
   .then(currency => {
       if(!currency) {
           return res.status(404).send({
               message: "Currency not found with id " + req.params.currencyId
           });
       }
       res.send(currency);
   }).catch(err => {
       if(err.kind === 'ObjectId') {
           return res.status(404).send({
               message: "Currency not found with id " + req.params.currencyId
           });
       }
       return res.status(500).send({
           message: "Error updating currency with id " + req.params.currencyId
       });
   });
};

exports.delete = (req, res) => {
  Currency.findByIdAndRemove(req.params.currencyId)
    .then(currency => {
        if(!currency) {
            return res.status(404).send({
                message: "Currency not found with id " + req.params.currencyId
            });
        }
        res.send({message: "Currency deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Currency not found with id " + req.params.currencyId
            });
        }
        return res.status(500).send({
            message: "Could not delete currency with id " + req.params.currencyId
        });
    });
};
