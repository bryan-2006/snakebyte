import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Enrollment } from './Enrollment';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column({ unique: true })
  @Field()
  email!: string;

  @Column()
  @Field()
  name!: string;

  @Field()
  @Column({ default: false })
  isAdmin!: boolean;

  @OneToMany(() => Enrollment, enrollment => enrollment.user)
  @Field(() => [Enrollment])
  enrollments!: Enrollment[];
}
