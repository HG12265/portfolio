import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  icon_name: { type: String, default: 'FaCode' },
  proficiency: { type: String, default: 'Intermediate' },
  color: { type: String, default: '#38BDF8' },
  description: { type: String },
  display_order: { type: Number, default: 0 },
  enabled: { type: Boolean, default: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default mongoose.models.Skill || mongoose.model('Skill', skillSchema);
