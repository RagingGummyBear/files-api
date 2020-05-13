import express from 'express';

import { createFileUpload, updateFileUpload, deleteFileUpload, readFileUpload, readFileUploads, downloadFile } from '@controllers/fileUploadController';
import authenticateJWT from '@middlewares/authenticateJWT';
import { singleBase64FileUpload } from '@middlewares/base64FileUpload';

const router = express.Router();

router.post('/file-upload/', [authenticateJWT, singleBase64FileUpload('imageData')], createFileUpload);
router.get('/file-upload/', [authenticateJWT], readFileUploads);
router.get('/file-upload/:fileUploadUuid', [authenticateJWT], readFileUpload);
router.delete('/file-upload/:fileUploadUuid', [authenticateJWT], deleteFileUpload);
router.put('/file-upload/:fileUploadUuid', [authenticateJWT], updateFileUpload);
router.get('/file-upload/:fileUploadUuid/download', [authenticateJWT], downloadFile);

export default router;
