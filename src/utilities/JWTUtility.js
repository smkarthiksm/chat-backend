import jwt from 'jsonwebtoken';

import * as ApplicationConstants from '../constants/ApplicationConstants';
import * as secret from '../constants/Secrets';


export const generateJWT = (payload) => {
  console.log(payload);

  let token = jwt.sign(payload,
    secret.JWT_SECRET,
    {
      expiresIn: '1h'
    }
  );
  return token;
};

export const validateJWT = (req, res, next) => {
  let token = req.headers['authorization'];
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, secret.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(ApplicationConstants.UNAUTHORIZED)
          .send({ "message": ApplicationConstants.LOGIN_EXPIRED, "status": ApplicationConstants.UNAUTHORIZED });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(ApplicationConstants.UNAUTHORIZED)
      .send({ "message": ApplicationConstants.ACCOUNT_NOT_LOGGED_IN, "status": ApplicationConstants.UNAUTHORIZED });
  }
};