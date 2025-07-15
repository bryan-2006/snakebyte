import { gql, useQuery } from 'urql';
import { Course } from '@/types/Course';

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
    <div>
      <h1>Courses</h1>
      <ul>
        {data.courses.map((course: Course) => (
          <li key={course.id}>
            <strong>{course.title}</strong>: {course.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
