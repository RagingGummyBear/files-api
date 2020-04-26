import mongoose from 'mongoose';

const user = encodeURIComponent('root');
const password = encodeURIComponent('rootpassword');
const authMechanism = 'DEFAULT';

// Connection URL
const url = `mongodb://${user}:${password}@localhost:27017/?authMechanism=${authMechanism}`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, dbName: 'files-api' }).then(() => {
  console.warn('Connection to mongoDB successful');
}).catch((err) => {
  console.error('Connection to mongoDB failed');
  console.error(err);
});

mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
