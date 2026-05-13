import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as Models from './api/models.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = 'mongodb+srv://fantaseaindo_db_user:I2mbUD0gxQUdZH83@cluster0.xfof3dx.mongodb.net/portfolio?retryWrites=true&w=majority';
const DB_FILE = path.join(__dirname, 'db.json');

async function runMigration() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected!');

    if (!fs.existsSync(DB_FILE)) {
      console.error('Error: db.json not found in this folder!');
      process.exit(1);
    }

    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    console.log('Reading local data...');

    // Clear existing data to avoid duplicates during this manual migration
    console.log('Cleaning up cloud database...');
    await Models.User.deleteMany({});
    await Models.Project.deleteMany({});
    await Models.Education.deleteMany({});
    await Models.Experience.deleteMany({});
    await Models.Certification.deleteMany({});
    await Models.Seminar.deleteMany({});
    await Models.Proficiency.deleteMany({});
    await Models.SkillGroup.deleteMany({});
    await Models.Settings.deleteMany({});

    console.log('Uploading new data to Cloud...');
    if (data.users) await Models.User.insertMany(data.users);
    if (data.projects) await Models.Project.insertMany(data.projects);
    if (data.education) await Models.Education.insertMany(data.education);
    if (data.experience) await Models.Experience.insertMany(data.experience);
    if (data.certification) await Models.Certification.insertMany(data.certification);
    if (data.seminars) await Models.Seminar.insertMany(data.seminars);
    if (data.proficiencies) await Models.Proficiency.insertMany(data.proficiencies);
    if (data.skillGroups) await Models.SkillGroup.insertMany(data.skillGroups);
    if (data.settings) await Models.Settings.create(data.settings);

    console.log('SUCCESS! All your data is now in the Cloud.');
    console.log('You can now check your website at Vercel.');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

runMigration();
