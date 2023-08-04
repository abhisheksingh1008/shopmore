"use client";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const getPaymentIntent = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/orders/get-payment-intent`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx.user?.token}`,
          },
        }
      );

      const data = await response.json();

      //   console.log(data);

      if (!data.success) {
        throw new Error(data.message);
      }

      return data.clientSecret;
    } catch (error) {
      console.log(error);
    }
  };

  const makePayment = async () => {
    try {
      const clientSecret = await getPaymentIntent();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form id="payment-form" onSubmit={makePayment}>
      <CardElement id="card-element" />
      <button id="submit" type="submit">
        Pay Now
      </button>
    </form>
  );
};

export default PaymentForm;
