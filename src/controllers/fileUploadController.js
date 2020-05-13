import HttpStatus from 'http-status-codes';

import FileUploadService from '@services/fileUploadService';
import FileService from '@services/fileService';
import { fileUploadResponseMapper } from '@helpers/mappers/fileUploadMapper';

export const createFileUpload = async (req, res) => {
  const { fileName: uuid, uploadDestination, extension } = req.fileUpload;
  const { name, type, description, category } = req.body;
  const { username } = req.user;
  try {
    const fileUpload = await FileUploadService.createFileUpload(
      {
        uuid,
        name,
        type: extension,
        description,
        category,
        uploadDestination,
        uploadedBy: username,
        uploadedOn: new Date(),
      }
    );
    return res.status(HttpStatus.CREATED).send(fileUploadResponseMapper(fileUpload));
  }
  catch (err) {
    const { message } = err;
    return res.status(HttpStatus.BAD_REQUEST).send({ message });
  }
};

export const updateFileUpload = async (req, res) => {
  const { fileUploadUuid } = req.params;
  const { name, type, description, category } = req.body;
  const { username } = req.user;
  try {
    const fileUpload = await FileUploadService.updateFileUpload(
      {
        username,
        uuid: fileUploadUuid,
        name,
        type,
        description,
        category,
      }
    );
    return res.status(HttpStatus.OK).send(fileUploadResponseMapper(fileUpload));
  }
  catch (err) {
    const { message } = err;
    return res.status(HttpStatus.BAD_REQUEST).send({ message });
  }
};

export const deleteFileUpload = async (req, res) => {
  const { fileUploadUuid } = req.params;
  const { username } = req.user;
  try {
    const fileUpload = await FileUploadService.deleteFileUpload({ username, uuid: fileUploadUuid });
    return res.status(HttpStatus.DELETED).send(fileUploadResponseMapper(fileUpload));
  }
  catch (err) {
    const { message, errorCode } = err;
    if (errorCode === 403) {
      return res.status(HttpStatus.FORBIDDEN).send({ message: 'Access FORBIDDEN' });
    }
    if (errorCode === 404) {
      return res.status(HttpStatus.NOT_FOUND).send({ message: `File upload not found`, uuid });
    }
    return res.status(HttpStatus.BAD_REQUEST).send({ message });
  }
};

export const readFileUploads = async (req, res) => {
  try {
    const fileUploads = await FileUploadService.findFileUploads(req.query);
    return res.status(HttpStatus.OK).send(fileUploadResponseMapper(fileUploads));
  }
  catch (err) {
    const { message } = err;
    return res.status(HttpStatus.BAD_REQUEST).send({ message });
  }
};

export const readFileUpload = async (req, res) => {
  const { fileUploadUuid } = req.params;
  const { username } = req.user;
  try {
    const fileUpload = await FileUploadService.findUploadFileByUuid({ uuid: fileUploadUuid });
    return res.status(HttpStatus.OK).send(fileUploadResponseMapper(fileUpload));
  }
  catch (err) {
    const { message, errorCode } = err;
    if (errorCode === 404) {
      return res.status(HttpStatus.NOT_FOUND).send({ message: `File upload not found`, uuid });
    }
    return res.status(HttpStatus.BAD_REQUEST).send({ message });
  }
};

export const downloadFile = async (req, res) => {
  const { fileUploadUuid } = req.params;
  const { downloadType } = req.query;
  const uploadFile = await FileUploadService.findUploadFileByUuid({ uuid: fileUploadUuid });
  switch (downloadType) {
    case 'base64':
      uploadFile.data = await FileService.readBase64FileFullPath(uploadFile.uploadDestination);
      return res.status(HttpStatus.OK).send(uploadFile);
    default:
      return res.download(uploadFile.uploadDestination, `${uploadFile.name}.${uploadFile.type}`);
  }
};
