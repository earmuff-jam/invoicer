/**
 * File : 0007_create_stripe_checkout_session.js
 *
 * This file is used to allow tenants to perform checkout session.
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
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const {
      amount,
      stripeOwnerAccountId,
      propertyId,
      propertyOwnerId,
      tenantId,
      rentMonth,
      tenantEmail,
    } = JSON.parse(event.body);

    const session = await stripe.checkout.sessions.create(
      {
        payment_method_types: ["card", "us_bank_account"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Monthly Rent",
              },
              unit_amount: amount * 100, // amount in cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        customer_email: tenantEmail,
        metadata: {
          tenantId,
          propertyId,
          propertyOwnerId,
          rentMonth,
          amount,
          customer_email: tenantEmail,
        },
        success_url:
          process.env.VITE_AUTH_STRIPE_PAYMENT_CONFIRMATION_SUCCESS_URL +
          "&session_id={CHECKOUT_SESSION_ID}",
        cancel_url:
          process.env.VITE_AUTH_STRIPE_PAYMENT_CONFIRMATION_FAILURE_URL,
      },
      {
        stripeAccount: stripeOwnerAccountId, // session is created on behalf of the property owner
      },
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error("Stripe Checkout Error:", err.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
