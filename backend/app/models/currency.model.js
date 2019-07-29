const mongoose = require('mongoose')

const CurrencySchema = mongoose.Schema({
    email: { type: String, unique: true, required: true },
    contactNo: { type: Number, required: true },
    currency: { type: String, required: true },
    priceLimit: { type: String, required: true },
    alert: { type: Boolean, default: false}
});

module.exports = mongoose.model('Currency', CurrencySchema)
