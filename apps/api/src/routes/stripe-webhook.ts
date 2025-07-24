import { Request, Response } from 'express';
import Stripe from 'stripe';
import { AppDataSource } from '../config/database';
import { Enrollment, PaymentStatus } from '../types/Enrollment';
import { User } from '../types/User';
import { Course } from '../types/Course';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig!, webhookSecret);
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed.', err);
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  // Handle successful payment
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    const courseId = Number(paymentIntent.metadata.courseId);
    const userId = Number(paymentIntent.metadata.userId);
    const paymentId = paymentIntent.id;

    try {
      const enrollmentRepo = AppDataSource.getRepository(Enrollment);
      const userRepo = AppDataSource.getRepository(User);
      const courseRepo = AppDataSource.getRepository(Course);

      const user = await userRepo.findOneByOrFail({ id: userId });
      const course = await courseRepo.findOneByOrFail({ id: courseId });

      const newEnrollment = enrollmentRepo.create({
        user,
        course,
        userId,
        courseId,
        paymentStatus: PaymentStatus.COMPLETED,
        paymentId,
      });

      await enrollmentRepo.save(newEnrollment);

      console.log('✅ Enrollment saved:', newEnrollment);
      return res.json({ received: true });
    } catch (err) {
      console.error('❌ Failed to save enrollment:', err);
      return res.status(500).json({ error: 'Failed to save enrollment' });
    }
  }

  res.json({ received: true });
};
