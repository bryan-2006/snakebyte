'use client';

import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState, useEffect} from 'react';
import { useSession} from 'next-auth/react';

interface CheckoutFormProps {
  clientSecret: string;
  courseId: string;
}

export default function CheckoutForm({ clientSecret, courseId }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Billing information state
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    email: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'CA',
    },
  });

  // Autofill
useEffect(() => {
  const userEmail = session?.user?.email;
  if (userEmail) {
    setBillingInfo(prev => ({
      ...prev,
      email: userEmail
    }));
  }
}, [session]);

    const handleInputChange = (field: string, value: string) => {
        console.log('Field:', field, 'Value:', value);

      if (field.startsWith('address.')) {
        const addressField = field.split('.')[1];
        setBillingInfo(prev => ({
          ...prev,
          address: {
            ...prev.address,
            [addressField]: value
          }
        }));
      } else {
        setBillingInfo(prev => ({
          ...prev,
          [field]: value
        }));
      }
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    setError(null);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: {
          name: billingInfo.name,
          email: billingInfo.email,
          address: billingInfo.address,
        },
      }
    });

    if (result.error) {
      setError(result.error.message || 'Payment failed');
    } else {
      console.log('Payment succeeded!');
      // Redirect to success page
      window.location.href = `/success?courseId=${courseId}`;
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-card rounded-lg">
      <h2 className="text-2xl mb-6">Complete Your Purchase</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Cardholder Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Cardholder Name</label>
          <input
            type="text"
            value={billingInfo.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="John Doe"
            className="w-full p-3 border rounded bg-background text-foreground"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={billingInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="john@example.com"
            className="w-full p-3 border rounded bg-background text-foreground"
            required
          />
        </div>

        {/* Card Information */}
        <div>
          <label className="block text-sm font-medium mb-2">Card Information</label>
          <div className="p-4 border rounded">
            <CardElement 
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#ffffff',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                },
                hidePostalCode: true
              }}
            />
          </div>
        </div>

        {/* Address Line 1 */}
        <div>
          <label className="block text-sm font-medium mb-2">Address</label>
          <input
            type="text"
            value={billingInfo.address.line1}
            onChange={(e) => handleInputChange('address.line1', e.target.value)}
            placeholder="123 Main Street"
            className="w-full p-3 border rounded bg-background text-foreground"
            required
          />
        </div>

        {/* Address Line 2 */}
        <div>
          <input
            type="text"
            value={billingInfo.address.line2}
            onChange={(e) => handleInputChange('address.line2', e.target.value)}
            placeholder="Apartment, suite, etc. (optional)"
            className="w-full p-3 border rounded bg-background text-foreground"
          />
        </div>

        {/* City, State, Postal Code */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {billingInfo.address.country === 'CA' ? 'Province' : 'State'}
          </label>
<input
  type="text"
  value={billingInfo.address.state}
  onChange={(e) => handleInputChange('address.state', e.target.value)}
  placeholder={billingInfo.address.country === 'CA' ? 'ON, BC, QC...' : 'CA, NY, TX...'}
  className="w-full p-3 border rounded bg-background text-foreground"
  style={{ color: 'white' }} // Add this temporarily to test
  required
/>
        </div>
          <div>
            <label className="block text-sm font-medium mb-2">ZIP</label>
            <input
              type="text"
              value={billingInfo.address.postal_code}
              onChange={(e) => handleInputChange('address.postal_code', e.target.value)}
              placeholder="H0H 0H0"
              className="w-full p-3 border rounded bg-background text-foreground"
              required
            />
          </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium mb-2">Country</label>
          <select
            value={billingInfo.address.country}
            onChange={(e) => handleInputChange('address.country', e.target.value)}
            className="w-full p-3 border rounded bg-background text-foreground"
            required
          >
            <option value="CA">Canada</option>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            {/* Add more countries as needed */}
          </select>
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        
        <button 
          type="submit" 
          disabled={!stripe || loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
}