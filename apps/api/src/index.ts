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



async function main() {
    // Initialize database
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }

  const app = express();
  app.post('/webhook/stripe', bodyParser.raw({ type: 'application/json' }), stripeWebhook);

  const schema = await buildSchema({
    resolvers: [CourseResolver, EnrollmentResolver, PaymentResolver]
  });

  const apolloServer = new ApolloServer({
    schema,
  });

  await apolloServer.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
      // Future: You could validate sessions here if needed for Simple GraphQL Context (Future-proofing)
      return {
        // For now, just pass through any headers
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

// // Placeholder for authentication
// async function getUserFromToken(token: string) {
//   // Implement JWT verification here
//   return null;
// }

main().catch(console.error);