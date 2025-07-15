import { Query, Resolver } from 'type-graphql';
import { Course } from '../types/Course';

@Resolver()
export class CourseResolver {
  @Query(() => [Course])
  courses() {
    return [
      { id: 1, title: 'Intro to Programming', description: 'Start coding.' },
      { id: 2, title: 'Advanced JS', description: 'Go deeper.' },
    ];
  }
}
