const parseCookies = (req, res, next) => {
  let cookies = req.headers.cookie;

  // if (req.get('Cookie')) {
  //   console.log(req.get('Cookie').split('='));
  // }


  let parsedCookie = [];

  for (let cookie in req.headers.cookie) {
    parsedCookie.push(req.headers.cookie[cookie]);
  }

  let output = {};

  while (parsedCookie.includes('=')) {
    if (parsedCookie[0] === ' ') {
      parsedCookie = parsedCookie.slice(1);
    }
    let cookieName = parsedCookie.slice(0, parsedCookie.indexOf('=')).join('');
    parsedCookie = parsedCookie.slice((parsedCookie.indexOf('=') + 1));
    if (parsedCookie.includes(';')) {
      output[cookieName] = ((parsedCookie.slice(0, parsedCookie.indexOf(';'))).join(''));
    } else {
      output[cookieName] = ((parsedCookie.slice(0)).join(''));
    }

    if (parsedCookie.includes('=')) {
      parsedCookie = parsedCookie.slice((parsedCookie.indexOf(';') + 1));
    } else {
      parsedCookie = parsedCookie.slice((parsedCookie.indexOf(';')));
    }

  }

  req.cookies = output;
  next();

};

module.exports = parseCookies;