export interface User {
  id: number;
  email: string;
  name: string;
  isAdmin: boolean;
  googleId?: string;
  createdAt?: Date;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  logo: string;
  price: number;
}

export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  paymentStatus: string;
  enrolledAt: Date;
  course?: Course;
  user?: User;
}