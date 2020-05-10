import HttpStatus from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';

import { saveBase64File } from '@services/fileService';

export const singleFileMiddleware = (fieldName, uploadPath = '/uploads', transferType = 'base64') => (req, res, next) => {
  if (req.body[fieldName]) {
    const message = `Required field "${fieldName}" is missing`;
    return res.status(HttpStatus.BAD_REQUEST).send({ message });
  }
  const fileData = req.body[fieldName];
};

export default {
  singleFileMiddleware,
};
