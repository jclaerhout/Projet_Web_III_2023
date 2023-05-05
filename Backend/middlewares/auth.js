const jwt = require('jsonwebtoken');
const secret = 'your_secret_key';

function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
        res.status(401).send(err);
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  } else {
    res.status(401).send('Unauthorized bis');
  }
}

module.exports = { authenticate };