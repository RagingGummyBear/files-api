import express from 'express';

import { createFileUpload, updateFileUpload, deleteFileUpload, readFileUpload, readFileUploads } from '@controllers/fileUploadController';
import authenticateJWT from '@middlewares/authenticateJWT';

const router = express.Router();

router.post('/file-upload/', [authenticateJWT], createFileUpload);
router.get('/file-upload/', [authenticateJWT], readFileUploads);
router.get('/file-upload/:fileUploadUuid', [authenticateJWT], readFileUpload);
router.delete('/file-upload/:fileUploadUuid', [authenticateJWT], deleteFileUpload);
router.put('/file-upload/:fileUploadUuid', [authenticateJWT], updateFileUpload);

export default router;
