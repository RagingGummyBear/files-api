import HttpStatus from 'http-status-codes';
import { saveBase64File } from '@services/fileService';

const getUploadDestination = (req) => {
  const { category } = req.body;
  return category;
}

export const singleBase64FileUpload = (dataField) => async (req, res, next) => {
  if (req.body[dataField] === undefined) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ message: `File data not found in the field ${dataField}` });
  }

  const data = req.body[dataField];
  const { filename, extension } = req.body;
  const uploadDestination = getUploadDestination(req);
  // (data, name, path, extension)
  const fileUpload = await saveBase64File(data, filename, uploadDestination, extension);
  req.fileUpload = fileUpload;
  next();
}

export default {
  singleBase64FileUpload,
};
