import { Query, Resolver } from 'type-graphql';
import { Course } from '../types/Course';
import { Terminal, Zap, Shield, ArrowRight } from 'lucide-react';

@Resolver()
export class CourseResolver {
  @Query(() => [Course])
  courses() {
    return [
      { id: 1, logo: "Terminal", title: 'Intro to Programming', description: 'Start learning computer logic and algorithmic know how by using one of the most well known programming languages - Python. \n\nLearn the basics of programming, build a variety of projects, join in on discussions, and partake in friendly competitions.' },
      { id: 2, logo: "Gamepad2", title: 'Intermediate Programming', description: 'Go deeper and learn the abstract nature of object oriented programming, using Python once again this time to make and design our very own games. \n\nThe less rigid structure is intended for students with pre-existing knowledge of basic programming to make use of as to steer their development journey.' },      
      { id: 3, logo: "Globe", title: 'Web Design', description: 'Explore the three pillars of web design to help you start your journey as a web developer. \n\nLearn the structure of web pages with HTML, give it a personal touch with CSS, and bring the webpage to life with Javascript. Start exploring the ever evolving world of web dev!' },
    ];
  }
}
