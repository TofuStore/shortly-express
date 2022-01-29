const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (Object.keys(req.cookies).length === 0) {
    let hash = models.Sessions.create();
    req.session = {hash: hash};
    res.cookies['shortlyid'] = hash;
  }

  const getPromise = new Promise((resolve, reject) => {
    resolve(models.Sessions.get(req.session.hash));
  });

  getPromise.then(result => {
    console.log(result);
  });

  // if (models.Sessions.get(req.session.hash)) {
  //   console.log(models.Sessions.get(req.session.hash));
  // }

  next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

