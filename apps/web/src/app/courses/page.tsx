'use client';

import { gql, useQuery } from 'urql';
import { Course } from '@snakebyte/shared';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { SquareTerminal, Gamepad2, Globe} from 'lucide-react'

const CoursesQuery = gql`
  query {
    courses {
      id
      title
      description
      logo
    }
  }
`;

const iconMap = {
  'SquareTerminal': SquareTerminal,
  'Gamepad2': Gamepad2,
  'Globe': Globe,
} as const;

export default function CoursesPage() {
  const [{ data, fetching, error }] = useQuery({ query: CoursesQuery });

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
                <Card key={course.id} className="p-6 bg-card/50 border-green-400/20 flex flex-col min-h-[300px]">
                  <IconComponent className="h-8 w-8 mb-4 text-green-400" />
                  <h3 className="text-xl mb-2">{course.title}</h3>
                  <p className="text-muted-foreground whitespace-pre-line flex-1">
                    {course.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}