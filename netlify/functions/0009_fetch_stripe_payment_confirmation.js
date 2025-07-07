/**
 * File : 0009_fetch_stripe_payment_confirmation.js
 *
 * This file is used to confirm payments
 *
 * Must have feature flags enabled for this feature.
 */

import Stripe from "stripe";

const stripe = new Stripe(process.env.VITE_AUTH_STRIPE_CONNECTION_SECRET_KEY, {
  apiVersion: process.env.VITE_AUTH_STRIPE_CONNECTION_API_VERSION,
});

/**
 * handler fn
 *
 * handler fn to create a checkout session
 *
 * @param {Object} event - The event payload passed
 */
export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { sessionId, stripeAccountId } = JSON.parse(event.body);

    if (!sessionId || !stripeAccountId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      stripeAccount: stripeAccountId,
    });

    if (session.payment_status !== "paid") {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Payment not completed" }),
      };
    }

    console.log(session);

    return {
      statusCode: 200,
      body: JSON.stringify({ session }),
    };
  } catch (error) {
    console.error("Error confirming payment:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
