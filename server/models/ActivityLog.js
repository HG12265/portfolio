import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
  admin_id: { type: String },
  admin_name: { type: String },
  action: { type: String, required: true },
  module: { type: String, required: true },
  details: { type: String },
  ip_address: { type: String }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default mongoose.models.ActivityLog || mongoose.model('ActivityLog', activityLogSchema);
