import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  key_name: { type: String, required: true, unique: true },
  value_text: { type: String }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default mongoose.models.Setting || mongoose.model('Setting', settingSchema);
