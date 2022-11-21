import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { CheckoutForm } from '~/components/checkout/stripe/CheckoutForm';

let _stripe: Promise<Stripe | null>;
function getStripe(publishableKey: string) {
  if (!_stripe) {
    _stripe = loadStripe(publishableKey);
  }
  return _stripe;
}

export function StripePayments({
  clientSecret,
  publishableKey,
  orderCode,
}: {
  clientSecret: string;
  publishableKey: string;
  orderCode: string;
}) {
  const options = {
    // passing the client secret obtained from the server
    clientSecret,
  };
  const stripePromise = getStripe(publishableKey);

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm orderCode={orderCode} />
    </Elements>
  );
}
