import { Course } from '../types';

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded p-4 shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-semibold">{course.title}</h2>
      <p className="text-gray-700 dark:text-gray-300">{course.description}</p>
    </div>
  );
}