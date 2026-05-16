import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const ProjectSchema = new mongoose.Schema({
  id: String,
  title: String,
  category: String,
  description: String,
  longDescription: String,
  technologies: [String],
  images: [String]
});

const EducationSchema = new mongoose.Schema({
  id: String,
  title: String,
  date: String,
  subtitle: String,
  description: String,
  tags: [String]
});

const ExperienceSchema = new mongoose.Schema({
  id: String,
  title: String,
  date: String,
  subtitle: String,
  description: String,
  tags: [String]
});

const CertificationSchema = new mongoose.Schema({
  id: String,
  title: String,
  subtitle: String,
  features: [String],
  image: String
});

const SeminarSchema = new mongoose.Schema({
  id: String,
  title: String,
  issuer: String,
  date: String,
  summary: String,
  details: String,
  image: String
});

const ProficiencySchema = new mongoose.Schema({
  id: String,
  skill: String,
  level: Number,
  color: String
});

const SkillGroupSchema = new mongoose.Schema({
  id: String,
  title: String,
  skills: [String]
});

const SettingsSchema = new mongoose.Schema({
  profilePicture: String,
  projectCategories: [String],
  instagram: String,
  instagramName: String,
  linkedin: String,
  linkedinName: String,
  github: String,
  githubName: String,
  discord: String,
  discordName: String,
  tiktok: String,
  tiktokName: String
});

export const User = mongoose.model('User', UserSchema);
export const Project = mongoose.model('Project', ProjectSchema);
export const Education = mongoose.model('Education', EducationSchema);
export const Experience = mongoose.model('Experience', ExperienceSchema);
export const Certification = mongoose.model('Certification', CertificationSchema);
export const Seminar = mongoose.model('Seminar', SeminarSchema);
export const Proficiency = mongoose.model('Proficiency', ProficiencySchema);
export const SkillGroup = mongoose.model('SkillGroup', SkillGroupSchema);
export const Settings = mongoose.model('Settings', SettingsSchema);
