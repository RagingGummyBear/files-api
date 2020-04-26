const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, max: 255, unique : true },
  password: { type: String, required: true, max: 100, dropDups: true },
  uuid: { type: String, required: true },
  role: { type: String, required: true },
});

UserSchema.post('save', function(err, doc, next) {
  next((err.code === 11000)
    ? new Error('Fields are not unique')
    : error);
});

// Export the model
module.exports = mongoose.model('User', UserSchema);