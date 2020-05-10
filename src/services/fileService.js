import fs from 'fs';
import mime from 'mime';

export const saveBase64File = (data, path, name) => {
  const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  const fileType = (matches) ? matches[1] : 'file';
  console.warn(matches);
  const buff = Buffer.from(data, 'base64');
  const fullPath = `${global.appRoot}/${(path) ? path : 'uploads'}/${name}.${fileType}`;
  fs.mkdirSync(`${global.appRoot}/${(path) ? path : 'uploads'}/`, { recursive: true });

  fs.writeFileSync(`${fullPath}`, buff);
};

export const readBase64File = async (file) => {
  if (file === undefined) {
    throw new Error('FileService#readBase64File: Bad argument');
  }

  fs.accessSync(`${global.appRoot}/${file}`, fs.constants.R_OK);

  const buff = await fs.readFileSync(`${global.appRoot}/${file}`);
  return buff.toString('base64');
};

export default {
  saveBase64File,
  readBase64File,
};
