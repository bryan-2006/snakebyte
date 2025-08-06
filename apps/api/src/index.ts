import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSchema } from 'type-graphql';
import { CourseResolver } from './resolvers/CourseResolver';
import { EnrollmentResolver } from './resolvers/EnrollmentResolver';
import { PaymentResolver } from './resolvers/PaymentResolver';
import { AppDataSource } from './config/database';
import { stripeWebhook } from './routes/stripe-webhook';
import bodyParser from 'body-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import compression from 'compression';
import { getUserFromSession } from './utils/auth';
import { GraphQLContext } from './types/Context';
import { ensureAdminUsers } from './utils/adminSetup';

async function main() {
  // Initialize database
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');
    
    // Ensure admin users exist
    await ensureAdminUsers();
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }

  const app = express();

  // Stricter rate limiting for production
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: process.env.NODE_ENV === 'production' ? 50 : 100,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });

  // CORS configuration for production
  // const corsOptions = {
  //   origin: process.env.NODE_ENV === 'production' 
  //     ? ['https://your-domain.com', 'https://www.your-domain.com'] // Your actual domains
  //     : ['http://localhost:3000'],
  //   credentials: true,
  // };

  const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://35.183.184.18:3000',
      'https://snakebyte-ten.vercel.app/', 'http://snakebyte-ten.vercel.app/'], // Update with your actual domains
    credentials: true,
  };

  // Production security middleware
  // if (process.env.NODE_ENV === 'production') {
  //   app.use(helmet({
  //     contentSecurityPolicy: false, // GraphQL needs this disabled
  //   }));
  //   app.use(compression());
  // }

  app.use(cors(corsOptions));

  app.post('/webhook/stripe', bodyParser.raw({ type: 'application/json' }), stripeWebhook);

  const schema = await buildSchema({
    resolvers: [CourseResolver, EnrollmentResolver, PaymentResolver]
  });

  const apolloServer = new ApolloServer<GraphQLContext>({
    schema,
    introspection: process.env.NODE_ENV !== 'production', // Disable in production
    plugins: process.env.NODE_ENV === 'production' ? [] : undefined,
  });

  await apolloServer.start();

  app.use(
    '/graphql', 
    limiter,
    cors(corsOptions),
    express.json({ limit: '10mb' }),
    expressMiddleware(apolloServer, {
      context: async ({ req }): Promise<GraphQLContext> => {
        const user = await getUserFromSession(req.headers.authorization as string);
        return {
          user,
          headers: req.headers
        };
      },
    }),
  );

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  });
}

main().catch(console.error);