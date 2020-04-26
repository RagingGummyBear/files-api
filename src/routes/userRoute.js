import express from 'express';

import { createUser, loginUser, readUsers } from '@controllers/userController';
import authenticateJWT from '@middlewares/authenticateJWT';
import { createUserValidator, loginUserValidator, userRoleValidation, validateHandler } from '@middlewares/validators/userValidators';
import userRoles from '@helpers/userRoles';

const router = express.Router();

// users Routes
router.post('/auth/signup', [...createUserValidator(), validateHandler], createUser);
router.post('/auth/login', [loginUserValidator(), validateHandler], loginUser);
router.get('/auth/users', [authenticateJWT, userRoleValidation(userRoles.admin)], readUsers);

export default router;
