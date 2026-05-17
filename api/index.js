import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import * as Models from './models.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MongoDB Connection
// Added /portfolio to ensure it uses a specific database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://fantaseaindo_db_user:I2mbUD0gxQUdZH83@cluster0.xfof3dx.mongodb.net/portfolio?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Security configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', 'public', 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
  }
});
const upload = multer({ storage: storage });

const DB_FILE = path.join(__dirname, '..', 'db.json');

// --- Migration Script ---
const migrateData = async () => {
  try {
    const userCount = await Models.User.countDocuments();
    if (userCount > 0) return;
    if (!fs.existsSync(DB_FILE)) return;

    console.log('Migrating data from db.json to MongoDB...');
    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));

    if (data.users) await Models.User.insertMany(data.users);
    if (data.projects) await Models.Project.insertMany(data.projects);
    if (data.education) await Models.Education.insertMany(data.education);
    if (data.experience) await Models.Experience.insertMany(data.experience);
    if (data.certification) await Models.Certification.insertMany(data.certification);
    if (data.seminars) await Models.Seminar.insertMany(data.seminars);
    if (data.proficiencies) await Models.Proficiency.insertMany(data.proficiencies);
    if (data.skillGroups) await Models.SkillGroup.insertMany(data.skillGroups);
    if (data.settings) await Models.Settings.create(data.settings);

    console.log('Data migration completed successfully.');
  } catch (err) {
    console.error('Migration error:', err);
  }
};

migrateData();

// --- Router for API ---
const router = express.Router();

// --- Auth Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Models.User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
      res.json({ success: true, token, user: { id: user._id, username: user.username } });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.put('/admin', authenticateToken, async (req, res) => {
  const { oldUsername, oldPassword, newUsername, newPassword } = req.body;
  try {
    const user = await Models.User.findOne({ username: oldUsername });
    if (user && await bcrypt.compare(oldPassword, user.password)) {
      if (newUsername) user.username = newUsername;
      if (newPassword) user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      res.json({ success: true });
    } else { res.status(401).json({ success: false, message: 'Invalid old credentials' }); }
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

const collectionMap = {
  projects: Models.Project,
  education: Models.Education,
  experience: Models.Experience,
  certification: Models.Certification,
  seminars: Models.Seminar,
  proficiencies: Models.Proficiency,
  skillGroups: Models.SkillGroup
};

router.get('/:collection', async (req, res, next) => {
  const Model = collectionMap[req.params.collection];
  if (!Model) return next();
  try { res.json(await Model.find()); } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/:collection', authenticateToken, async (req, res, next) => {
  const Model = collectionMap[req.params.collection];
  if (!Model) return next();
  try { res.json({ success: true, item: await Model.create(req.body) }); } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.put('/:collection/:id', authenticateToken, async (req, res, next) => {
  const Model = collectionMap[req.params.collection];
  if (!Model) return next();
  try {
    const item = await Model.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (item) res.json({ success: true, item });
    else res.status(404).json({ success: false, message: 'Item not found' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.delete('/:collection/:id', authenticateToken, async (req, res, next) => {
  const Model = collectionMap[req.params.collection];
  if (!Model) return next();
  try {
    const result = await Model.findOneAndDelete({ id: req.params.id });
    if (result) res.json({ success: true });
    else res.status(404).json({ success: false, message: 'Item not found' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/settings', async (req, res) => {
  try {
    let settings = await Models.Settings.findOne();
    
    const defaultSettings = {
      profilePicture: '/images/profile-picture-default.png',
      instagram: '',
      instagramName: '',
      linkedin: '',
      linkedinName: '',
      github: '',
      githubName: '',
      discord: '',
      discordName: '',
      tiktok: '',
      tiktokName: ''
    };

    if (!settings) {
      settings = await Models.Settings.create(defaultSettings);
    }

    res.json({ ...defaultSettings, ...settings.toObject() });
  } catch (err) {
    console.error('Error fetching settings:', err);
    const defaultSettings = {
      profilePicture: '/images/profile-picture-default.png',
      instagram: '',
      instagramName: '',
      linkedin: '',
      linkedinName: '',
      github: '',
      githubName: '',
      discord: '',
      discordName: '',
      tiktok: '',
      tiktokName: ''
    };
    res.json(defaultSettings);
  }
});

router.put('/settings', authenticateToken, async (req, res) => {
  try {
    const existingSettings = await Models.Settings.findOne();
    let updatedSettings;
    
    if (existingSettings) {
      updatedSettings = await Models.Settings.findOneAndUpdate(
        {}, 
        { $set: req.body }, 
        { new: true }
      );
    } else {
      const defaultSettings = {
        profilePicture: '/images/profile-picture-default.png',
        instagram: '',
        instagramName: '',
        linkedin: '',
        linkedinName: '',
        github: '',
        githubName: '',
        discord: '',
        discordName: '',
        tiktok: '',
        tiktokName: ''
      };
      updatedSettings = await Models.Settings.create({ ...defaultSettings, ...req.body });
    }
    
    res.json({ success: true, settings: updatedSettings });
  } catch (err) {
    console.error('Error saving settings:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/upload', authenticateToken, upload.single('image'), (req, res) => {
  if (req.file) res.json({ success: true, url: `/uploads/${req.file.filename}` });
  else res.status(400).json({ success: false, message: 'Upload failed' });
});

router.get('/test', (req, res) => res.json({ message: 'API is working' }));

// Use the router for both /api and / routes to ensure compatibility
app.use('/api', router);
app.use('/', router);

export default app;

const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`API Server running on port ${PORT}`));
}


