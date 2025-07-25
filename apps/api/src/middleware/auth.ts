import { MiddlewareFn } from 'type-graphql';
import { GraphQLContext } from '../types/Context';

export const AuthMiddleware: MiddlewareFn<GraphQLContext> = ({ context }, next) => {
  const user = context.user;
  
  if (!user || !user.isAdmin) {
    throw new Error('Access denied. Admin privileges required.');
  }
  
  return next();
};