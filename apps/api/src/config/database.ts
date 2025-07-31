import { DataSource } from 'typeorm';
import { User } from '../types/User';
import { Course } from '../types/Course';
import { Enrollment } from '../types/Enrollment';
import { config } from './env';
import * as fs from 'fs';
import * as path from 'path';

// Path to the certificate file
const certPath = path.resolve(__dirname, '../../certs/prod-ca-2021.crt');
console.log(`Looking for SSL certificate at: ${certPath}`);

// Check if certificate exists
const certExists = fs.existsSync(certPath);
console.log(`Certificate ${certExists ? 'found' : 'not found'}`);

// Read certificate if it exists
const cert = certExists ? fs.readFileSync(certPath).toString() : undefined;

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  ssl: {
    ca: cert,                 // Use the certificate content
    rejectUnauthorized: true  // Enforce certificate validation
  },
  synchronize: false,         // Safer option for production databases
  logging: true,
  entities: [User, Course, Enrollment],
  migrations: process.env.NODE_ENV === 'production' ? ['dist/migrations/*.js'] : [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Successfully connected to Supabase database with SSL");
  })
  .catch(error => {
    console.error("❌ Database connection failed:");
    console.error(error);
  });