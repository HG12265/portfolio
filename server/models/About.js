import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  tagline: { type: String },
  bio: { type: String, required: true },
  career_objective: { type: String, required: true },
  technical_interests: [String],
  leadership_text: { type: String },
  current_learning: [String],
  location: { type: String },
  email: { type: String },
  phone: { type: String },
  profile_image_url: { type: String, default: '/assets/gowtham-profile.png' },
  github_url: { type: String, default: 'https://github.com/gowthamg-dev' },
  linkedin_url: { type: String, default: 'https://linkedin.com/in/gowthamg-dev' },
  twitter_url: { type: String, default: 'https://twitter.com/gowthamg_dev' },
  instagram_url: { type: String, default: 'https://instagram.com/gowthamg_dev' }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default mongoose.models.About || mongoose.model('About', aboutSchema);
