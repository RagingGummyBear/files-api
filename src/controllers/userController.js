/* eslint-disable camelcase */
import { v4 as uuidv4 } from 'uuid';
import HttpStatus from 'http-status-codes';

import UserService from '@services/userService';
import { userRoles } from '@helpers/userRoles';
import { generateJwtToken } from '@helpers/generateJwtToken';

export const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserService.createUser(email, password, uuidv4(), userRoles.basic);
    const accessToken = generateJwtToken(user);
    return res.status(HttpStatus.OK).send({
      accessToken,
      email,
      uuid: user.uuid,
      role: user.role,
    });
  }
  catch (err) {
    const { message } = err;
    return res.status(HttpStatus.BAD_REQUEST).send({ message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserService.loginUser(email, password);
    const accessToken = generateJwtToken(user);
    return res.status(HttpStatus.OK).send({
      accessToken,
      email,
      uuid: user.uuid,
      role: user.role,
    });
  } catch (err) {
    const { message } = err;
    return res.status(HttpStatus.BAD_REQUEST).send({ message });
  }
};

// This is for debuging only
export const readUsers = async (req, res) => {
  const users = await UserService.readUsers();
  return res.status(HttpStatus.OK).send(users);
};