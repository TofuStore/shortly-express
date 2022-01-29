const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {

  Promise.resolve(req.cookies.shortlyid)
    .then(hash => {
      if (!hash) {
        throw hash;
      }
      return models.Sessions.get({ hash });
    })
    .tap(session => {
      if (!session) {
        throw session;
      }
    })
    // initializes a new session
    .catch(() => {
      return models.Sessions.create()
        .then(results => {
          return models.Sessions.get({ id: results.insertId });
        })
        .tap(session => {
          res.cookie('shortlyid', session.hash);
        });
    })
    .then(session => {
      req.session = session;
      next();
    });



  //my attempt:

  // if (Object.keys(req.cookies).length === 0) {
  //   let hash = models.Sessions.create();
  //   req.session = {hash: hash};
  //   res.cookies['shortlyid'] = hash;
  // }

  // const getPromise = new Promise((resolve, reject) => {
  //   resolve(models.Sessions.get(req.session.hash));
  // });

  // getPromise.then(result => {
  //   console.log(result);
  // });

  // if (models.Sessions.get(req.session.hash)) {
  //   console.log(models.Sessions.get(req.session.hash));
  // }

  // next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

module.exports.verifySession = (req, res, next) => {
  if (!models.Sessions.isLoggedIn(req.session)) {
    res.redirect('/login');
  } else {
    next();
  }
};