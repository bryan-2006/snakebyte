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
  synchronize: true,
  logging: true,
  entities: [User, Course, Enrollment],
});