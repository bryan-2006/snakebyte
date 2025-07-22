export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  enrolledAt: Date;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentId?: string;
}