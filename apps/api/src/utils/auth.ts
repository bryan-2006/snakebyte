import { AppDataSource } from '../config/database';
import { User } from '../types/User';

export async function getUserFromSession(sessionToken?: string): Promise<User | undefined> { // Change to undefined
  if (!sessionToken) return undefined; // Change to undefined
  
  try {
    // Extract email from session token (simplified)
    // In real app, validate the JWT or session
    const email = sessionToken; // For now, assume header contains email
    
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { email } });
    return user || undefined; 
  } catch (error) {
    return undefined;
  }
}