module.exports = (app) => {
    var Request = require("request");

    app.get('/getallcurrency', (req, res) => {
      var allData = []
      Request.get("https://api.binance.com/api/v3/ticker/price", (error, response, body) => {
          if(error) {
              return console.dir(error);
          }
          allData = JSON.parse(body)
          // return allData
          res.send(allData)
      });
      // return allData
      // console.log('allData', allData)
    });
}
