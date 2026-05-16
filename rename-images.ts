import fs from 'fs';
import path from 'path';

const publicImagesDir = path.join(process.cwd(), 'public', 'images');
const constantsPath = path.join(process.cwd(), 'src', 'constants.ts');
const dbPath = path.join(process.cwd(), 'db.json');

const renameMap: Record<string, string> = {
  'Screenshot-2026-04-13-190937.png': 'receipt-extraction-1.png',
  'Screenshot-2026-04-12-182143.png': 'receipt-extraction-2.png',
  'Tirta-sayaga-web.png': 'tirta-sayaga.png',
  'Techtive.png': 'techtive-marketplace.png',
  'Whats-App-Image-2025-12-24-at-13-30-18.jpg': 'pc-troubleshoot-1.jpg',
  'Whats-App-Image-2025-12-24-at-7-22-30-AM.jpg': 'pc-troubleshoot-2.jpg',
  'video-edit.jpg': 'video-production.jpg',
  '2RIZAL.png': 'jersey-design-1.png',
  '10SIMANUNGKALIT.png': 'jersey-design-2.png',
  'image.png': 'poster-design-1.png',
  'poster-map.png': 'poster-design-2.png',
  'FL-Image.png': 'audio-production.png',
  'Unipin-1.png': 'unipin-event-1.png',
  'Unipin-2.png': 'unipin-event-2.png',
  'office-work.png': 'office-admin.png',
  'Gemini-Generated-Image-vr34qqvr34qqvr34-removebg-preview.png': 'profile-picture-default.png'
};

// 1. Rename files in public/images
console.log('Renaming files in public/images...');
for (const [oldName, newName] of Object.entries(renameMap)) {
  const oldPath = path.join(publicImagesDir, oldName);
  const newPath = path.join(publicImagesDir, newName);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${oldName} -> ${newName}`);
  } else {
    console.log(`Skipped: ${oldName} (not found)`);
  }
}

// 2. Update src/constants.ts
console.log('Updating src/constants.ts...');
if (fs.existsSync(constantsPath)) {
  let constantsContent = fs.readFileSync(constantsPath, 'utf-8');
  for (const [oldName, newName] of Object.entries(renameMap)) {
    // Escape regex characters just in case, though these are simple filenames
    const regex = new RegExp(oldName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
    constantsContent = constantsContent.replace(regex, newName);
  }
  fs.writeFileSync(constantsPath, constantsContent);
  console.log('constants.ts updated.');
}

// 3. Update db.json
console.log('Updating db.json...');
if (fs.existsSync(dbPath)) {
  let dbContent = fs.readFileSync(dbPath, 'utf-8');
  const dbData = JSON.parse(dbContent);
  
  // Update projects images
  if (dbData.projects) {
    dbData.projects = dbData.projects.map((project: any) => {
      if (project.images) {
        project.images = project.images.map((img: string) => {
          for (const [oldName, newName] of Object.entries(renameMap)) {
            if (img.includes(oldName)) {
              return img.replace(oldName, newName);
            }
          }
          return img;
        });
      }
      return project;
    });
  }

  // Ensure settings exist with profile picture
  if (!dbData.settings) {
    dbData.settings = {};
  }
  if (!dbData.settings.profilePicture) {
    dbData.settings.profilePicture = '/images/profile-picture-default.png';
  }

  fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
  console.log('db.json updated.');
}

console.log('All operations complete.');
