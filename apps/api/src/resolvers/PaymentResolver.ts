import { Resolver, Mutation, Arg, Float, Int } from 'type-graphql';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

@Resolver()
export class PaymentResolver {
  @Mutation(() => String) // Returns client secret
  async createPaymentIntent(
    @Arg('amount', () => Float) amount: number,
    @Arg('courseId', () => Int) courseId: number,
    @Arg('userId', () => Int) userId: number
  ): Promise<string> {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'cad',
      metadata: { courseId: courseId.toString(), userId: userId.toString() },
    });

    return paymentIntent.client_secret!;
  }
}