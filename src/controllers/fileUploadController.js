import HttpStatus from 'http-status-codes';

import FileUploadService from '@services/FileUploadService';
import { fileUploadResponseMapper } from '@helpers/mappers/fileUploadMapper';

export const createFileUpload = async (req, res) => {
  const { uuid, uploadDestination } = req.fileUpload;
  const { name, type, description, category } = req.body;
  const { username } = req.user;
  try {
    const fileUpload = await FileUploadService.createFileUpload(
      {
        uuid,
        name,
        type,
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
    const fileUpload = await FileUploadService.findUploadFileByUuid({ username, uuid: fileUploadUuid });
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
