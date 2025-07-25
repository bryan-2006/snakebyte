'use client';

import { gql, useQuery, useMutation} from 'urql';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Course } from '@snakebyte/shared';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import toast from 'react-hot-toast';
import { SquareTerminal, Gamepad2, Globe, CheckCircle, Lock } from 'lucide-react';

// GraphQL query to fetch courses
const CoursesQuery = gql`
  query {
    courses {
      id
      title
      description
      logo
      price
    }
  }
`;

// Add query to get user enrollments
const UserEnrollmentsQuery = gql`
  query GetUserEnrollmentsByEmail($userEmail: String!) {
    getUserEnrollmentsByEmail(userEmail: $userEmail) {
      id
      courseId
      paymentStatus
      enrolledAt
      course {
        id
        title
        description
        logo
        price
      }
    }
  }
`;

// Mutation to create payment intent
const CreatePaymentIntentMutation = gql`
  mutation CreatePaymentIntent($amount: Float!, $courseId: Int!, $userEmail: String!) {
    createPaymentIntent(amount: $amount, courseId: $courseId, userEmail: $userEmail)
  }
`;

// Map course logos to icons
const iconMap = {
  'Terminal': SquareTerminal,
  'Gamepad2': Gamepad2,
  'Globe': Globe,
} as const;

export default function CoursesPage() {
  const [{ data, fetching, error }] = useQuery({ query: CoursesQuery });
  const { data: session } = useSession();
  const router = useRouter();
  const [, createPaymentIntent] = useMutation(CreatePaymentIntentMutation);

  // Get user enrollments if logged in
  const [{ data: enrollmentData, fetching: enrollmentsFetching }] = useQuery({
    query: UserEnrollmentsQuery,
    variables: { userEmail: session?.user?.email || '' },
    pause: !session?.user?.email, // Don't run query if not logged in
  });

  const handleEnroll = async (courseId: number, price: number) => {
    if (!session?.user?.email) {
      toast.error('Please log in to enroll in this course');
      return;
    }

    try {
      const result = await createPaymentIntent({
        amount: price,
        courseId,
        userEmail: session.user.email
      });

      if (result.error) {
        console.error('Payment setup failed:', result.error);
        toast.error('Payment setup failed. Please try again.');
        return;
      }

      const clientSecret = result.data?.createPaymentIntent;
      router.push(`/checkout?clientSecret=${clientSecret}&courseId=${courseId}`);
    } catch (error) {
      console.error('Payment setup failed:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  // Get enrolled course IDs for quick lookup
  const enrolledCourseIds = new Set(
    enrollmentData?.getUserEnrollmentsByEmail?.map((enrollment: any) => enrollment.courseId) || []
  );

  // Filter courses into enrolled and available
  const allCourses = data?.courses || [];
  const enrolledCourses = allCourses.filter((course: Course) => enrolledCourseIds.has(course.id));
  const availableCourses = allCourses.filter((course: Course) => !enrolledCourseIds.has(course.id));

  const renderCourseCard = (course: Course, isEnrolled: boolean = false) => {
    const IconComponent = iconMap[course.logo as keyof typeof iconMap] || SquareTerminal;
    
    return (
      <Card key={course.id} className={`p-6 bg-card/50 border-green-400/20 flex flex-col min-h-[350px] ${isEnrolled ? 'border-green-500' : ''}`}>
        <div className="flex justify-between items-start mb-4">
          <IconComponent className="h-8 w-8 text-green-400" />
          {isEnrolled && (
            <div className="flex items-center text-green-500 text-sm">
              <CheckCircle className="h-4 w-4 mr-1" />
              Enrolled
            </div>
          )}
        </div>
        <h3 className="text-xl mb-2">{course.title}</h3>
        <p className="text-muted-foreground whitespace-pre-line flex-1 mb-4">
          {course.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-green-400">
            ${course.price} CAD
          </span>
          {isEnrolled ? (
            <Button disabled className="bg-green-600 opacity-50">
              Enrolled
            </Button>
          ) : (
            <Button 
              onClick={() => handleEnroll(course.id, course.price)}
              className="bg-green-600 hover:bg-green-700"
            >
              {session ? 'Enroll' : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Enroll
                </>
              )}
            </Button>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Show enrolled courses first if user is logged in and has enrollments */}
          {session && enrolledCourses.length > 0 && (
            <>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl mb-4 text-green-400">Your Programs</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8 mb-20">
                {enrolledCourses.map((course: Course) => renderCourseCard(course, true))}
              </div>
            </>
          )}

          {/* Available courses section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl mb-4">
              {session && enrolledCourses.length > 0 ? 'Available Courses' : 'Offered Courses'}
            </h2>
            {fetching && <p className="text-xl text-muted-foreground">Loading...</p>}
            {error && <p className="text-xl text-muted-foreground">Error: {error.message}</p>}
            {!session && (
              <p className="text-muted-foreground">Sign in to enroll in courses and track your progress</p>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {session ? (
              // Show only available courses if logged in
              availableCourses.length > 0 ? (
                availableCourses.map((course: Course) => renderCourseCard(course, false))
              ) : (
                <div className="col-span-2 text-center py-8">
                  <p className="text-xl text-muted-foreground">
                    You're enrolled in all available courses!
                  </p>
                </div>
              )
            ) : (
              // Show all courses if not logged in
              allCourses.map((course: Course) => renderCourseCard(course, false))
            )}
          </div>
          
          {enrollmentsFetching && session && (
            <div className="text-center mt-8">
              <p className="text-muted-foreground">Checking your enrollments...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}