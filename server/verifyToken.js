const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
  const tokenHeader = req.headers.token;
  if (tokenHeader) {
    const token = tokenHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, info) => {
      if (err) res.status(403).json('Token is not valid');
      req.user = info;
      next();
    });
  } else {
    res.status(401).json('You are not Authenticated');
  }
};

module.exports = verify;
