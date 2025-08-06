import { Request, Response } from 'express';
import Stripe from 'stripe';
import { EnrollmentResolver } from '../resolvers/EnrollmentResolver';
import { AppDataSource } from '../config/database';
import { Enrollment, PaymentStatus } from '../types/Enrollment';
import { User } from '../types/User';
import { Course } from '../types/Course';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.log('Webhook signature verification failed.', err);
    return res.status(400).send(`Webhook Error: ${err}`);
  }

  console.log('Received event:', event.type);

  try {
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('PaymentIntent succeeded:', paymentIntent.id);
        console.log('Metadata:', paymentIntent.metadata);

        const { courseId, userEmail } = paymentIntent.metadata;

        if (!courseId || !userEmail) {
          console.error('Missing metadata:', { courseId, userEmail });
          break;
        }

        console.log('Attempting to create enrollment for:', { userEmail, courseId });

        try {
          const enrollmentResolver = new EnrollmentResolver();
          const enrollment = await enrollmentResolver.enrollUserByEmail(
            userEmail,
            parseInt(courseId),
            paymentIntent.id
          );
          console.log('✅ Enrollment created successfully:', enrollment);
        } catch (error) {
          console.error('❌ Error creating enrollment:', error);
          if (error instanceof Error) {
            console.error('Error details:', error.message);
            console.error('Stack trace:', error.stack);
          } else {
            console.error('Error details:', error);
          }
        }
        break;
        
      case 'payment_intent.payment_failed':
        console.log('Payment failed:', event.data.object.id);
        break;
        
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error('Webhook processing error:', error);
  }

  res.json({received: true});
};