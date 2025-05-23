/**
 * File : 0001_send_email_fn.js file
 *
 * This file is only used to perform netlify functions on the cloud. This enables
 * our frontend application to perform backend tasks easily. Eg, Send Email.
 *
 * Must have feature flags enabled for this feature.
 */
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.VITE_SENDGRID_API_KEY);

/**
 * handler fn
 *
 * handler fn to handle the passed on event payload
 * @param {Object} event - The event payload passed from Netlify function
 */
export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const { to, subject, text, html } = JSON.parse(event.body);

  const msg = {
    to,
    from: process.env.VITE_SENDGRID_VERIFIED_EMAIL_KEY,
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: `${("Unable to send email. Details: ", error)}`,
      }),
    };
  }
};
