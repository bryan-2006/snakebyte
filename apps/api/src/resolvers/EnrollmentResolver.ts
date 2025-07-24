import { Resolver, Mutation, Query, Arg, Ctx, Int } from 'type-graphql';
import { AppDataSource } from '../config/database';
import { Enrollment, PaymentStatus } from '../types/Enrollment';
import { Course } from '../types/Course';
import { User } from '../types/User';

@Resolver()
export class EnrollmentResolver {
  @Query(() => [Enrollment])
  async getUserEnrollments(@Arg('userId', () => Int) userId: number): Promise<Enrollment[]> {
    const enrollmentRepo = AppDataSource.getRepository(Enrollment);
    return await enrollmentRepo.find({ 
      where: { userId }, 
      relations: ['course'] 
    });
  }

  @Mutation(() => Enrollment)
  async enrollInCourse(
    @Arg('courseId', () => Int) courseId: number,
    @Arg('userId', () => Int) userId: number,
    @Arg('paymentId') paymentId: string
  ): Promise<Enrollment> {
    const enrollmentRepo = AppDataSource.getRepository(Enrollment);
    const courseRepo = AppDataSource.getRepository(Course);
    const userRepo = AppDataSource.getRepository(User);

    // Verify course and user exist
    const course = await courseRepo.findOne({ where: { id: courseId } });
    if (!course) {
      throw new Error('Course not found');
    }

    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Check if already enrolled
    const existingEnrollment = await enrollmentRepo.findOne({
      where: { userId, courseId }
    });
    if (existingEnrollment) {
      throw new Error('User already enrolled in this course');
    }

    // Create enrollment record
    const enrollment = new Enrollment();
    enrollment.userId = userId;
    enrollment.courseId = courseId;
    enrollment.user = user;
    enrollment.course = course;
    enrollment.paymentId = paymentId;
    enrollment.paymentStatus = PaymentStatus.COMPLETED;
    enrollment.enrolledAt = new Date();

    return await enrollmentRepo.save(enrollment);
  }

  @Query(() => [Course])
  async getEnrolledCourses(@Arg('userId', () => Int) userId: number): Promise<Course[]> {
    const enrollmentRepo = AppDataSource.getRepository(Enrollment);
    
    const enrollments = await enrollmentRepo.find({ 
      where: { userId, paymentStatus: PaymentStatus.COMPLETED },
      relations: ['course'] 
    });
    
    return enrollments.map(e => e.course);
  }

  // Helper method for webhook usage (works with email instead of userId)
  @Mutation(() => Enrollment)
  async enrollUserByEmail(
    @Arg('userEmail') userEmail: string,
    @Arg('courseId', () => Int) courseId: number,
    @Arg('paymentId') paymentId: string
  ): Promise<Enrollment> {
    const userRepo = AppDataSource.getRepository(User);
    
    // Find or create user by email
    let user = await userRepo.findOne({ where: { email: userEmail } });
    if (!user) {
      user = new User();
      user.email = userEmail;
      user.name = userEmail.split('@')[0]; // Simple name from email
      user = await userRepo.save(user);
    }

    // existing enrollInCourse method
    return this.enrollInCourse(courseId, user.id, paymentId);
  }

  // Query to get enrollments by email (useful for frontend)
  @Query(() => [Enrollment])
  async getUserEnrollmentsByEmail(@Arg('userEmail') userEmail: string): Promise<Enrollment[]> {
    const userRepo = AppDataSource.getRepository(User);
    
    const user = await userRepo.findOne({ where: { email: userEmail } });
    if (!user) return [];

    return this.getUserEnrollments(user.id);
  }
}