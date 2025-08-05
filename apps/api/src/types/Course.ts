import { ObjectType, Field, Int, Float } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Enrollment } from './Enrollment';
// import { Course as ICourse } from '@snakebyte/shared';

@Entity()
@ObjectType()
export class Course { // implements ICourse
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column()
  @Field()
  title!: string;

  @Column('text')
  @Field()
  description!: string;

  @Column()
  @Field()
  logo!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @Field(() => Float)
  price!: number;

  @OneToMany(() => Enrollment, enrollment => enrollment.course)
  enrollments!: Enrollment[];
}