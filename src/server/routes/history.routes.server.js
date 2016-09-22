let ODCHistory = require('../models/history.model.server');
let bodyparser = require('body-parser');

module.exports = function(router) {
  router.use(bodyparser.json());

//add new data
  router.create('/odchistory', function(req, res) {
    let newHistory = new ODCHistory(req.body);
    newHistory.save(function (err, data) {
      if(err) {
        console.log(err);
        return res.status(400).json({msg: 'internal server error'});
      }
      res.json(data);
    });
});

};
