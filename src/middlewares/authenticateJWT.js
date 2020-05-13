import jwt from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';

const jwtSecret = (process.env.JWT_SECRET) ? process.env.JWT_SECRET : 'default_jwt_secret_woop_woop';

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        return res.sendStatus(HttpStatus.FORBIDDEN);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(HttpStatus.UNAUTHORIZED);
  }
}
