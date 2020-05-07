export const fileUploadResponseMapper = (object) => {
  if (Array.isArray(object)) {
    return object.map(obj => userDTOMapper(obj));
  }
  return { uuid, name, type, description, category, uploadDestination, uploadedBy, uploadedOn } = object;
}

export const fileUploadDTOMapper = (object) => {
  if (Array.isArray(object)) {
    return object.map(obj => userDTOMapper(obj));
  }
  return { uuid, name, type, description, category, uploadedBy, uploadedOn } = object;
}

export default {
  fileUploadResponseMapper,
  fileUploadDTOMapper,
};
