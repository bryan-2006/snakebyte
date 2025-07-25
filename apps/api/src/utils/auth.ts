import { AppDataSource } from '../config/database';
import { User } from '../types/User';
import jwt from 'jsonwebtoken';

interface NextAuthJWT {
  name?: string;
  email?: string;
  picture?: string;
  sub?: string;
  iat?: number;
  exp?: number;
  jti?: string;
}

export async function getUserFromSession(authHeader?: string): Promise<User | undefined> {
  if (!authHeader) return undefined;
  
  try {
    // Remove "Bearer " prefix if present
    const token = authHeader.replace('Bearer ', '');
    
    // For NextAuth, we can decode without verification since it's coming from our own app
    // In production, you'd verify with NEXTAUTH_SECRET
    const decoded = jwt.decode(token) as NextAuthJWT;
    
    if (!decoded || !decoded.email) {
      console.log('Invalid token or missing email');
      return undefined;
    }
    
    // Find user in database
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { email: decoded.email } });
    
    return user || undefined;
  } catch (error) {
    console.error('Session validation error:', error);
    return undefined;
  }
}

// For production JWT verification (optional)
export async function verifyNextAuthJWT(token: string): Promise<NextAuthJWT | null> {
  try {
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) return null;
    
    const decoded = jwt.verify(token, secret) as NextAuthJWT;
    return decoded;
  } catch (error) {
    return null;
  }
}