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
import { getUserFromSession } from './utils/auth';
import { GraphQLContext } from './types/Context';

async function main() {
    // Initialize database
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
  });

  const app = express();
  app.post('/webhook/stripe', bodyParser.raw({ type: 'application/json' }), stripeWebhook);

  const schema = await buildSchema({
    resolvers: [CourseResolver, EnrollmentResolver, PaymentResolver]
  });

  const apolloServer = new ApolloServer<GraphQLContext>({
    schema,
  });

  await apolloServer.start();

  app.use(
    '/graphql', 
    limiter,
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }): Promise<GraphQLContext> => {
        const user = await getUserFromSession(req.headers.authorization);
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