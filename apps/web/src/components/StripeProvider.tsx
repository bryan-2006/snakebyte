'use client';

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

// Only load Stripe if key exists
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

export function StripeProvider({ children }: { children: React.ReactNode }) {
  // If no Stripe key, just render children without Stripe
  if (!stripePromise) {
    console.warn('Stripe publishable key not found');
    return <>{children}</>;
  }

  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
}