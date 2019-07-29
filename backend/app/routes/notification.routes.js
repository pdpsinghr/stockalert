module.exports = (app) => {
  const notification = require('../controllers/notification.controller.js');

   app.get('/alertData/:id', notification.alertData);
}
