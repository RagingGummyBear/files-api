// call all the required packages
import 'babel-polyfill';
import '@db/setup';
import express from 'express';
import bodyParser from 'body-parser';
import createError from 'http-errors'; // TODO!
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';

import usersRoute from '@routes/userRoute';

const app = express();
const http = require('http').Server(app); // too lazy to remove this require

// app.use(morgan('common'));
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//ROUTES WILL GO HERE
app.get('/', function(req, res) {
    res.json({ message: 'WELCOME' });
});

app.use('/api/v1', usersRoute);


// import upload from './multerSetup';
// app.post('/upload', upload.single('fileUpload'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
//   res.redirect('/client-form');
// });

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
