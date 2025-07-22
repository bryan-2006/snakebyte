import dotenv from 'dotenv';

dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const config = {
  database: {
    host: requireEnv('DB_HOST'),
    port: parseInt(requireEnv('DB_PORT')),
    username: requireEnv('DB_USERNAME'),
    password: requireEnv('DB_PASSWORD'),
    name: requireEnv('DB_NAME'),
  },
  stripe: {
    secretKey: requireEnv('STRIPE_SECRET_KEY'),
    publishableKey: requireEnv('STRIPE_PUBLISHABLE_KEY'),
  },
  jwt: {
    secret: requireEnv('JWT_SECRET'),
  },
  auth: {
    googleClientId: requireEnv('GOOGLE_CLIENT_ID'),
    googleClientSecret: requireEnv('GOOGLE_CLIENT_SECRET'),
    nextAuthSecret: requireEnv('NEXTAUTH_SECRET'),
    nextAuthUrl: requireEnv('NEXTAUTH_URL'),
  },
};