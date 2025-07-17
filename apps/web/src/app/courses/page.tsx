'use client';

import { gql, useQuery } from 'urql';
import CourseCard from '@/components/CourseCard';
import { Course } from '@snakebyte/shared';

const CoursesQuery = gql`
  query {
    courses {
      id
      title
      description
    }
  }
`;

export default function CoursesPage() {
  const [{ data, fetching, error }] = useQuery({ query: CoursesQuery });

  return (
    <div>
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Available Courses</h1>

        {fetching && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}

        <div className="space-y-4">
          {data?.courses?.map((course: Course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </main>
    </div>
  );
}