import { ObjectType, Field, Int, registerEnumType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { Course } from './Course';

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

registerEnumType(PaymentStatus, {
  name: 'PaymentStatus',
});

@Entity()
@ObjectType()
export class Enrollment {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column()
  @Field(() => Int)
  userId!: number;

  @Column()
  @Field(() => Int)
  courseId!: number;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  @Field(() => PaymentStatus)
  paymentStatus!: PaymentStatus;

  @Column({ nullable: true })
  @Field({ nullable: true })
  paymentId?: string;

  @CreateDateColumn()
  @Field()
  enrolledAt!: Date;

  @ManyToOne(() => User, user => user.enrollments)
  @Field(() => User)
  user!: User;

  @ManyToOne(() => Course)
  @Field(() => Course)
  course!: Course;
}