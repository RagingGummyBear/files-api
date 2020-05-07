import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const FileUploadSchema = new Schema({
  uuid: { type: String, required: true },
  name: { type: String, default: 'untitled' },
  type: { type: String, default: 'file' },
  description: { type: String },
  category: { type: String, default: 'uncategorized' },
  uploadDestination: { type: String, default: '/uploads/default' },
  uploadedBy: { type: String },
  uploadedOn: { type: String },
});

FileUploadSchema.post('save', function(err, doc, next) {
  next((err.code === 11000)
    ? new Error('Fields are not unique')
    : err);
});

// Export the model
export default mongoose.model('FileUpload', FileUploadSchema);
