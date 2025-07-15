import { ObjectType, Field, Int } from 'type-graphql';
import { Course as ICourse } from '@snakebyte/shared';

@ObjectType()
export class Course implements ICourse {
  @Field(() => Int)
  id!: number;

  @Field()
  title!: string;

  @Field()
  description!: string;
}