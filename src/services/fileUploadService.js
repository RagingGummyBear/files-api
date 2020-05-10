import FileUpload from '@db/models/fileUpload.model';
import { fileUploadDTOMapper } from '@helpers/mappers/fileUploadMapper';

export const createFileUpload = async ({
  uuid,
  name,
  type,
  description,
  category,
  uploadDestination,
  uploadedBy,
  uploadedOn,
}) => {
  const fileUpload = new FileUpload({
    uuid,
    name,
    type,
    description,
    category,
    uploadDestination,
    uploadedBy,
    uploadedOn,
  });

  const savedFileUpload = await fileUpload.save();
  return fileUploadDTOMapper(savedFileUpload);
};

const _findUploadFileByUuid = async ({ uuid }) => {
  const fileUpload = FileUpload.findOne({ uuid });

  if (!fileUpload) {
    const error = new Error('Upload not found');
    error.errorCode = 404;
    throw error;
  }

  return fileUpload;
};

export const findUploadFileByUuid = async ({ uuid }) => {
  return fileUploadDTOMapper(_findUploadFileByUuid({ uuid }));
};

export const updateFileUpload = async ({
  username,
  uuid,
  name,
  type,
  description,
  category,
}) => {
  const fileUpload = _findUploadFileByUuid({ uuid });

  if (fileUpload.createdBy !== username) {
    const error = new Error(`User (${username}) not allowed to update ${fileUpload.name}`);
    error.errorCode = 403;
    throw error;
  }

  if (name) {
    fileUpload.name = name;
  }

  if (type) {
    fileUpload.type = type;
  }

  if (description) {
    fileUpload.description = description;
  }

  if (category) {
    fileUpload.category = category;
  }

  const updatedFileUpload = await fileUpload.save();
  return fileUploadDTOMapper(updatedFileUpload);
};

export const deleteFileUpload = async ({ uuid, username }) => {
  const fileUpload = _findUploadFileByUuid({ uuid });

  if (fileUpload.createdBy !== username) {
    const error = new Error(`User (${username}) not allowed to delete ${fileUpload.name}`);
    error.errorCode = 403;
    throw error;
  }

  await FileUpload.deleteOne({ _id: fileUpload._id });

  return fileUploadDTOMapper(fileUpload);
};

export const findFileUploads = async ({ name, type, category, uploadedBy, uploadedOn }) => {
  const queryObject = { };

  if (name) {
    queryObject.name = name;
  }

  if (type) {
    queryObject.type = type;
  }

  if (category) {
    queryObject.category = category;
  }

  if (uploadedBy) {
    queryObject.uploadedBy = uploadedBy;
  }

  if (uploadedOn) {
    queryObject.uploadedOn = uploadedOn;
  }

  const fileUploads = FileUpload.find(queryObject);

  return fileUploadDTOMapper(fileUploads);
}

export default {
  createFileUpload,
  findUploadFileByUuid,
  updateFileUpload,
  deleteFileUpload,
  findFileUploads,
}
