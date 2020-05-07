export const userDTOMapper = (object) => {
  if (Array.isArray(object)) {
    return object.map(obj => userDTOMapper(obj));
  }
  return { uuid, username, email, role } = object;
};

export const userResponseMapper = (object) => {
  if (Array.isArray(object)) {
    return object.map(obj => userResponseMapper(obj));
  }
  return { username, email, role } = object;
};

export default {
  userDTOMapper,
  userResponseMapper,
};
