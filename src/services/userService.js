import bcrypt from 'bcryptjs';

import User from '@db/models/user.model';
import { userDTOMapper } from '@helpers/mappers/userMapper';

export const createUser = async (email, password, uuid, role) => {
  if (await User.findOne({ email })) {
    throw new Error('Email taken');
  }

  const user = new User({
    email,
    password,
    uuid,
    role,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  const savedUser = await user.save();
  return userDTOMapper(savedUser);
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    return userDTOMapper(user);
  }
  throw new Error('Bad login credentials');
};

export const readUsers = async () => {
  const users = await User.find();
  return userDTOMapper(users);
};

export default {
  createUser,
  loginUser,
  readUsers,
};
