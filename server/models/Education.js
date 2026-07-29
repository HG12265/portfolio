import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  period: { type: String, required: true },
  status: { type: String, default: 'Graduated' },
  grade: { type: String },
  description: { type: String },
  courses: [String],
  display_order: { type: Number, default: 0 }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default mongoose.models.Education || mongoose.model('Education', educationSchema);
