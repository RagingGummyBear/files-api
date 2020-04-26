import jwt from 'jsonwebtoken';

export const jwtSecret = (process.env.JWT_SECRET)
  ? process.env.JWT_SECRET
  : 'default_jwt_secret_woop_woop';

export const generateJwtToken = (user) => (
  jwt.sign({ username: user.uuid,  role: user.role }, jwtSecret, { expiresIn: '20m' })
);

export default {
  jwtSecret,
  generateJwtToken,
};
