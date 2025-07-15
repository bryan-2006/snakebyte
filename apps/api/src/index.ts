import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSchema } from 'type-graphql';
import { CourseResolver } from './resolvers/CourseResolver';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

async function main() {
  const app = express();

  const schema = await buildSchema({
    resolvers: [CourseResolver]
  });

  const apolloServer = new ApolloServer({
    schema,
  });

  await apolloServer.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),

    /* explicit instead of the generic CORS configuration
    cors<cors.CorsRequest>({
        origin: 'http://localhost:3000',
        credentials: true,
    })*/

    express.json(),
    expressMiddleware(apolloServer)
  );

  app.listen(4000, () => {
    console.log('GraphQL API running at http://localhost:4000/graphql');
  });
}

main().catch(console.error);
