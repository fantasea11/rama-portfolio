import { PROJECTS } from './src/constants';
import fs from 'fs';

const db = {
  users: [
    {
      id: 1,
      username: "admin",
      password: "admin123"
    }
  ],
  projects: PROJECTS
};

fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
console.log('db.json generated successfully.');
