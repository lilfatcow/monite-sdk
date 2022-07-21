import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import React, { useEffect, useState } from 'react';
import { Appearance, loadStripe, Stripe } from '@stripe/stripe-js';
import { useTheme } from 'emotion-theming';
import { Theme } from '@monite/ui';

import type { PaymentWidgetProps } from './types';

let stripePromise: Promise<Stripe | null> | null = null;

type StripeFormProps = {
  clientSecret: string;
  price: number;
} & PaymentWidgetProps;

const StripeForm = ({
  clientSecret,
  returnUrl,
  onFinish,
  price,
  fee,
}: StripeFormProps) => {
  const theme = useTheme<Theme>();

  const [, setStripePromise] = useState(stripePromise);

  useEffect(() => {
    if (stripePromise) {
      return;
    }

    stripePromise = loadStripe(
      // TODO: make it as ENV variable?
      'pk_test_51IJivRCq0HpJYRYNxdxMiSromL6P4QicTwwdfYKICAXXTNzkVVkBzF308zNVoYXHw53TPb7aGBptDupflQjxzmGW00jBrBoehE'
    );

    setStripePromise(stripePromise);
  }, []);

  const appearance: Appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: theme.colors.primary,
    },
    rules: {
      '.Label': {
        marginBottom: '8px',
        marginTop: '12px',
        fontSize: '14px',
        fontWeight: '500',
        lineHeight: '20px',

        fontFamily:
          '"Faktum", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      },
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (!stripePromise) {
    return null;
  }

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            returnUrl={returnUrl}
            onFinish={onFinish}
            price={price}
            fee={fee}
          />
        </Elements>
      )}
    </>
  );
};

export default StripeForm;
