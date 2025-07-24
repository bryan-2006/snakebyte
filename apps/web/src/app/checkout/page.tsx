'use client';

import { useSearchParams } from 'next/navigation';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../components/CheckoutForm';

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

// Only load Stripe if key exists
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get('clientSecret');
  const courseId = searchParams.get('courseId');

  // Check if Stripe is configured
  if (!stripePromise) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Payment system not configured</h1>
          <p>Stripe publishable key is missing</p>
        </div>
      </div>
    );
  }

  if (!clientSecret || !courseId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Invalid checkout session</h1>
          <a href="/courses" className="text-blue-500 hover:underline">
            Return to courses
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <Elements 
        stripe={stripePromise}
        options={{ clientSecret }}
      >
        <CheckoutForm clientSecret={clientSecret} courseId={courseId} />
      </Elements>
    </div>
  );
}