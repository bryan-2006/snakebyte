export interface User {
  id: number;
  email: string;
  name: string;
  isAdmin: boolean;
  googleId?: string;
  createdAt?: Date;
}
