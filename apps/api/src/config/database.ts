import { DataSource } from 'typeorm';
import { User } from '../types/User';
import { Course } from '../types/Course';
import { Enrollment } from '../types/Enrollment';
import { config } from './env';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  synchronize: process.env.NODE_ENV !== 'production', // ⚠️ CRITICAL: False in production
  logging: process.env.NODE_ENV !== 'production',
  // ssl: process.env.NODE_ENV === 'production' ? { 
  //   rejectUnauthorized: false 
  // } : false,
  ssl: false, // Disable SSL for local testing
  entities: [User, Course, Enrollment],
  migrations: process.env.NODE_ENV === 'production' ? ['dist/migrations/*.js'] : [],
});