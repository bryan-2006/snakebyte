import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
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

  @Column({ unique: true })
  @Field()
  googleId!: string;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @OneToMany(() => Enrollment, enrollment => enrollment.user)
  @Field(() => [Enrollment])
  enrollments!: Enrollment[];
}