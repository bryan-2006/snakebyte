import { User } from './User';

export interface GraphQLContext {
  user?: User;
  headers: any;
}