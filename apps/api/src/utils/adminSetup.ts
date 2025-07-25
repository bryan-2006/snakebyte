import { AppDataSource } from '../config/database';
import { User } from '../types/User';

const ADMIN_EMAILS = [
  'snakebyte.service@gmail.com',
  // Add more admin emails here
];

export async function ensureAdminUsers() {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Skipping admin setup in development');
    return;
  }

  const userRepo = AppDataSource.getRepository(User);
  
  for (const email of ADMIN_EMAILS) {
    try {
      let user = await userRepo.findOne({ where: { email } });
      
      if (!user) {
        // Create admin user if doesn't exist
        user = new User();
        user.email = email;
        user.name = email.split('@')[0];
        user.isAdmin = true;
        await userRepo.save(user);
        console.log(`✅ Created admin user: ${email}`);
      } else if (!user.isAdmin) {
        // Make existing user admin
        user.isAdmin = true;
        await userRepo.save(user);
        console.log(`✅ Made user admin: ${email}`);
      }
    } catch (error) {
      console.error(`❌ Error setting up admin user ${email}:`, error);
    }
  }
}