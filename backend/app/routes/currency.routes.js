module.exports = (app) => {
    const currency = require('../controllers/currency.controller.js');

    app.post('/currency', currency.create);

    app.get('/currency', currency.findAll);

    app.get('/currency/:currency', currency.findOne);

    app.put('/currency/:currency', currency.update);

    app.delete('/currency/:currencyId', currency.delete);
}
