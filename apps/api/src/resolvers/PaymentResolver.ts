import { Resolver, Mutation, Arg, Float, Int } from 'type-graphql';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

@Resolver()
export class PaymentResolver {
  @Mutation(() => String)
  async createPaymentIntent(
    @Arg('amount', () => Float) amount: number,
    @Arg('courseId', () => Int) courseId: number,
    @Arg('userEmail') userEmail: string
  ): Promise<string> {
    console.log('Creating payment intent:', { amount, courseId, userEmail });
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      metadata: {
        courseId: courseId.toString(),
        userEmail: userEmail,
      },
    });

    return paymentIntent.client_secret!;
  }
}