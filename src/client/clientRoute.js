import express from 'express';

const router = express.Router();

// users Routes
router.get('/', (req, res, next) => {
  res.render('pages/index', {
    header: 'Home',
  });
});

router.get('/upload_file', (req, res, next) => {
  res.render('pages/upload_file', {
    header: 'UploadFile',
  });
});

router.get('/search_file', (req, res, next) => {
  res.render('pages/search_file', {
    header: 'SearchFile',
  });
});

router.post('/file_upload_table', (req, res, next) => {
  const { fileUploadData } = req.body;
  res.render('partials/file_upload_table', { fileUploadData });
});

export default router;
