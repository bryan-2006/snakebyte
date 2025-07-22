import { Resolver, Mutation, Query, Arg, Ctx, Int } from 'type-graphql';
import { Enrollment, PaymentStatus } from '../types/Enrollment';
import { Course } from '../types/Course';
import { User } from '../types/User';

@Resolver()
export class EnrollmentResolver {
  @Query(() => [Enrollment])
  async getUserEnrollments(@Arg('userId', () => Int) userId: number): Promise<Enrollment[]> {
    // Replace with your database query
    // return await Enrollment.find({ where: { userId }, relations: ['course'] });
    return [];
  }

  @Mutation(() => Enrollment)
  async enrollInCourse(
    @Arg('courseId', () => Int) courseId: number,
    @Arg('userId', () => Int) userId: number,
    @Arg('paymentId') paymentId: string
  ): Promise<Enrollment> {
    // Create enrollment record
    const enrollment = {
      id: Date.now(), // Replace with proper ID generation
      userId,
      courseId,
      paymentId,
      paymentStatus: PaymentStatus.COMPLETED,
      enrolledAt: new Date()
    };

    // Save to database
    // await enrollment.save();
    
    return enrollment as Enrollment;
  }

  @Query(() => [Course])
  async getEnrolledCourses(@Arg('userId', () => Int) userId: number): Promise<Course[]> {
    // Get courses user is enrolled in
    // const enrollments = await Enrollment.find({ 
    //   where: { userId, paymentStatus: PaymentStatus.COMPLETED },
    //   relations: ['course'] 
    // });
    // return enrollments.map(e => e.course);
    return [];
  }
}