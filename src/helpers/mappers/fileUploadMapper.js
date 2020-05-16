export const fileUploadResponseMapper = (object) => {
  if (Array.isArray(object)) {
    return object.map(obj => fileUploadResponseMapper(obj));
  }
  const { uuid, name, type, description, category, uploadedBy, uploadedOn } = object;
  return { uuid, name, type, description, category, uploadedBy, uploadedOn };
}

export const fileUploadDTOMapper = (object) => {
  if (Array.isArray(object)) {
    return object.map(obj => fileUploadDTOMapper(obj));
  }
  const { uuid, name, type, description, category, uploadDestination, uploadedBy, uploadedOn } = object;
  return { uuid, name, type, description, category, uploadDestination, uploadedBy, uploadedOn };
}

export default {
  fileUploadResponseMapper,
  fileUploadDTOMapper,
};
