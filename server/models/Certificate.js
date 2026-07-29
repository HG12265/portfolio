import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: { type: String, default: '' },
  duration: { type: String, default: '' },
  image_url: { type: String },
  description: { type: String },
  display_order: { type: Number, default: 0 }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default mongoose.models.Certificate || mongoose.model('Certificate', certificateSchema);
