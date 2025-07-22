'use client';

import { gql, useQuery } from 'urql';
import { useSession } from 'next-auth/react';
import { Course } from '@snakebyte/shared';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { SquareTerminal, Gamepad2, Globe } from 'lucide-react';

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

const iconMap = {
  'Terminal': SquareTerminal,
  'Gamepad2': Gamepad2,
  'Globe': Globe,
} as const;

export default function CoursesPage() {
  const [{ data, fetching, error }] = useQuery({ query: CoursesQuery });
  const { data: session } = useSession();

  const handleEnroll = async (courseId: number, price: number) => {
    if (!session) {
      alert('Please log in to enroll');
      return;
    }

    // Integrate with Stripe or your payment processor
    // For now, just a placeholder
    const paymentSuccess = await processPayment(courseId, price);
    
    if (paymentSuccess) {
      // Call enrollment mutation
      console.log(`Enrolled in course ${courseId}`);
    }
  };

  const processPayment = async (courseId: number, price: number): Promise<boolean> => {
    // Integrate with Stripe, PayPal, etc.
    // This is a placeholder
    return confirm(`Pay $${price} for this course?`);
  };

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl mb-4">Offered Courses</h2>
            {fetching && <p className="text-xl text-muted-foreground">Loading...</p>}
            {error && <p className="text-xl text-muted-foreground">Error: {error.message}</p>}
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {data?.courses?.map((course: Course) => {
              const IconComponent = iconMap[course.logo as keyof typeof iconMap] || SquareTerminal;
              return (
                <Card key={course.id} className="p-6 bg-card/50 border-green-400/20 flex flex-col min-h-[350px]">
                  <IconComponent className="h-8 w-8 mb-4 text-green-400" />
                  <h3 className="text-xl mb-2">{course.title}</h3>
                  <p className="text-muted-foreground whitespace-pre-line flex-1 mb-4">
                    {course.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-400">
                      {course.price}
                    </span>
                    <Button 
                      onClick={() => handleEnroll(course.id, course.price)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Enroll Now
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}