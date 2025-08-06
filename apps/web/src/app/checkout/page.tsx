'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CheckoutForm from '../../components/CheckoutForm';

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

function CheckoutContent() {
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get('clientSecret');
  const courseId = searchParams.get('courseId');
  const { status } = useSession(); // Remove 'data: session' since it's unused
  const router = useRouter();
  
  // Authentication check
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/');
    }
  }, [status, router]);

  // Show loading while checking authentication
  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Loading checkout...</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto"></div>
        </div>
      </div>
    );
  }

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

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Loading checkout...</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto"></div>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}