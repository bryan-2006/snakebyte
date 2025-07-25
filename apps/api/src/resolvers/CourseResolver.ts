import { Query, Resolver, Mutation, Arg, Float, UseMiddleware, Ctx} from 'type-graphql';
import { AuthMiddleware } from '../middleware/auth';
import { Course } from '../types/Course';
import { AppDataSource } from '../config/database';
import { GraphQLContext } from '../types/Context';

@Resolver()
export class CourseResolver {
  @Query(() => [Course])
  async courses(): Promise<Course[]> {
    const courseRepo = AppDataSource.getRepository(Course);
    let courses = await courseRepo.find();
    
    // If no courses in database, create the default ones
    if (courses.length === 0) {
      courses = await this.seedCourses();
    }
    
    return courses;
  }

  @Mutation(() => Course)
  @UseMiddleware(AuthMiddleware)
  async createCourse(
    @Arg('title') title: string,
    @Arg('description') description: string,
    @Arg('logo') logo: string,
    @Arg('price', () => Float) price: number,
    @Ctx() context: GraphQLContext // Update this type
  ): Promise<Course> {
    const courseRepo = AppDataSource.getRepository(Course);
    
    const course = new Course();
    course.title = title;
    course.description = description;
    course.logo = logo;
    course.price = price;
    
    return await courseRepo.save(course);
  }

  @Mutation(() => [Course])
  @UseMiddleware(AuthMiddleware)
  async seedCoursesManually(@Ctx() context: GraphQLContext): Promise<Course[]> {
    return await this.seedCourses();
  }

  // Helper method to seed initial courses
  private async seedCourses(): Promise<Course[]> {
    const courseRepo = AppDataSource.getRepository(Course);
    
    const coursesData = [
      { 
        title: 'Intro to Programming', 
        description: 'Start learning computer logic and algorithmic know how by using one of the most well known programming languages - Python. \n\nLearn the basics of programming, build a variety of projects, join in on discussions, and partake in friendly competitions.', 
        logo: "Terminal",
        price: 95.00
      },
      { 
        title: 'Intermediate Programming', 
        description: 'Go deeper and learn the abstract nature of object oriented programming, using Python once again this time to make and design our very own games. \n\nThe less rigid structure is intended for students with pre-existing knowledge of basic programming to make use of as to steer their development journey.', 
        logo: "Gamepad2",
        price: 145.00
      },      
      { 
        title: 'Web Design', 
        description: 'Explore the three pillars of web design to help you start your journey as a web developer. \n\nLearn the structure of web pages with HTML, give it a personal touch with CSS, and bring the webpage to life with Javascript. Start exploring the ever evolving world of web dev!', 
        logo: "Globe",
        price: 125.00
      },
    ];

    const courses = [];
    for (const courseData of coursesData) {
      const course = new Course();
      course.title = courseData.title;
      course.description = courseData.description;
      course.logo = courseData.logo;
      course.price = courseData.price;
      courses.push(await courseRepo.save(course));
    }
    
    return courses;
  }
}
