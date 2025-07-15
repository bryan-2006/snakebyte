'use client'
import { gql, useQuery } from 'urql';
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

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
      <div className="space-y-4">
        {data.courses.map((course: Course) => (
          <div
            key={course.id}
            className="border border-gray-300 rounded p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-gray-700">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}