import { Course } from './Course';
import { User } from './User';

export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  enrolledAt: string; // or Date
  course: Course;
  user: User;
}
