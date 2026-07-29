import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  category: { type: String, required: true },
  image_url: { type: String },
  description: { type: String, required: true },
  long_description: { type: String },
  tags: [String],
  features: [String],
  architecture: { type: String },
  role: { type: String },
  duration: { type: String },
  github_url: { type: String },
  demo_url: { type: String },
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
  display_order: { type: Number, default: 0 }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default mongoose.models.Project || mongoose.model('Project', projectSchema);
