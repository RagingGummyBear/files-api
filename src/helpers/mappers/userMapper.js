export const userDTOMapper = (object) => {
  if (Array.isArray(object)) {
    return object.map(obj => userDTOMapper(obj));
  }
  const { uuid, username, email, role } = object;
  return { uuid, username, email, role };
};

export const userResponseMapper = (object) => {
  if (Array.isArray(object)) {
    return object.map(obj => userResponseMapper(obj));
  }
  const { username, email, role } = object;
  return { username, email, role };
};

export default {
  userDTOMapper,
  userResponseMapper,
};
