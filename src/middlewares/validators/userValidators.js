import { body, validationResult } from 'express-validator';
import HttpStatus from 'http-status-codes';


export const createUserValidator = () => {
  return [
      body('email', 'Invalid email').exists().isEmail(),
      body('password', 'Please enter a valid password').exists().isLength({ min: 6 })
    ];
};

export const loginUserValidator = () => {
  return [
      body('email', 'Invalid email').exists().isEmail(),
      body('password', 'Please enter a valid password').isLength({ min: 6 })
    ];
};

export const userRoleValidation = (userRole) => (req, res, next) => {
  const { role } = req.user;
  if (role !== userRole) {
    return res.sendStatus(HttpStatus.FORBIDDEN);
  }
  next();
};

export const validateHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array({ onlyFirstError: true }) });
  }
  next();
};

export default {
  createUserValidator,
  loginUserValidator,
  userRoleValidation,
  validateHandler,
};
