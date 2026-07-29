import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  file_name: { type: String, required: true },
  file_url: { type: String, required: true },
  is_active: { type: Boolean, default: true }
}, { timestamps: { createdAt: 'uploaded_at', updatedAt: 'updated_at' } });

export default mongoose.models.Resume || mongoose.model('Resume', resumeSchema);
