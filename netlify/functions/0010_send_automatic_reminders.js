import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
  });
}

const db = admin.firestore();
const REMINDER_KEY = process.env.SECRET_KEY;

export const handler = async (event) => {
  if (event.queryStringParameters?.key !== REMINDER_KEY) {
    return { statusCode: 401, body: "Unauthorized" };
  }

  try {
    const today = new Date();
    const reminders = [7, 3, 1, 0];
    const snapshot = await db.collection("rents").get();
    const emailPromises = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      const rentDate = data.rentDueDate?.toDate ? data.rentDueDate.toDate() : new Date(data.rentDueDate);
      const diffDays = Math.ceil((rentDate - today) / (1000 * 60 * 60 * 24));

      if (reminders.includes(diffDays) && data.status === "unpaid") {
        const totalAmount =
          (Number(data.rentAmount || 0) +
            Number(data.additionalCharges || 0) +
            Number(data.initialLateFee || 0) +
            Number(data.dailyLateFee || 0)) / 100;

        const subject = `Rent Reminder: Due in ${diffDays} day(s)`;
        const text = `Hi, your rent of $${totalAmount.toFixed(2)} is due on ${rentDate.toLocaleDateString()}. Please pay on time to avoid late fees.`;

        emailPromises.push(
          fetch(`${process.env.SITE_URL}/.netlify/functions/0001_send_email_fn`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: data.tenantEmail,
              subject,
              text,
            }),
          })
        );
      }
    });

    await Promise.all(emailPromises);

    return { statusCode: 200, body: `Sent ${emailPromises.length} reminders.` };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: `Error: ${error.message}` };
  }
};
