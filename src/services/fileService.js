import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import mime from 'mime';

export const saveBase64File = async (data, name, path, extension) => {
  const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  const fileType = (matches.length === 3) ? mime.getExtension(matches[1]) : 'file';
  const saveExtension = (extension) ? extension : fileType;

  const saveData = Buffer.from((matches.length === 3) ? matches[2] : data, 'base64');

  let savePath = `${global.appRoot}/uploads/`;
  savePath += (path) ? `${path}/` : '';
  try {
    fs.accessSync(savePath, fs.constants.R_OK);
  } catch (err) {
    fs.mkdirSync(savePath, { recursive: true });
  }
  const fileName = (name) ? `${name}` : uuidv4();
  savePath += fileName;
  savePath += `.${saveExtension}`;

  fs.writeFileSync(`${savePath}`, saveData, { encoding: 'base64' });

  return {
    fileName,
    uploadDestination: savePath,
    extension: saveExtension,
  }
};


export const readBase64File = async (name, path, extension) => {
  if (name === undefined) {
    throw new Error('FileService#readBase64File: Bad argument');
  }

  let readPath = `${global.appRoot}/uploads/`;
    readPath += (path) ? `${path}/` : '';
  if (extension !== undefined) {
    readPath += `${name}.${extension}`;
  } else {
    const files = fs.readdirSync(`${readPath}`);
    const foundFile = files.filter(file => file.includes(name))[0];
    readPath += foundFile;
  }

  fs.accessSync(`${readPath}`, fs.constants.R_OK);

  const buff = await fs.readFileSync(`${readPath}`);
  return buff.toString('base64');
};

export const readBase64FileFullPath = async (fullPath) => {
  fs.accessSync(`${fullPath}`, fs.constants.R_OK);

  const buff = await fs.readFileSync(`${fullPath}`);
  return buff.toString('base64');
};

export default {
  saveBase64File,
  readBase64File,
  readBase64FileFullPath,
};
