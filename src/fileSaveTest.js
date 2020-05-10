import {
  saveBase64File,
  readBase64File,
} from './services/fileService';

// (data, path, name)
// saveBase64File()
console.warn('HALLUUUUU');

readBase64File('/brz.jpg').then(data => {
  console.warn(data);
  saveBase64File(data, 'uploads', 'brz.jpg');
}).catch(err => console.error(err));
