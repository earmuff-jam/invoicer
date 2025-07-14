/**
 * defaultTemplateData ...
 *
 * used to create default email templates to send to the client directly.
 */
export const defaultTemplateData = {
  invoice: {
    subject: "Monthly Rent Invoice - {{propertyAddress}}",
    body: "Dear {{tenantName}},\n\nPlease find attached your rent invoice for {{month}} {{year}}.\n\nProperty: {{propertyAddress}}\nAmount Due: ${{amount}}\nDue Date: {{dueDate}}\n\nPayment methods:\n• Online portal: {{paymentLink}}\n• Check payable to: {{companyName}}\n\nThank you,\n{{ownerName}}\n{{companyName}}",
  },
  reminder: {
    subject: "Payment Reminder - {{propertyAddress}}",
    body: "Dear {{tenantName}},\n\nThis is a friendly reminder that your rent payment of ${{amount}} was due on {{dueDate}}.\n\nProperty: {{propertyAddress}}\n\nPlease submit your payment as soon as possible to avoid late fees.\n\nIf you have already made this payment, please disregard this notice.\n\nBest regards,\n{{ownerName}}",
  },
  maintenance: {
    title: "Maintenance Request Form",
    description: "Submit maintenance requests for prompt resolution",
    fields:
      "Issue Type, Location, Description, Urgency Level, Preferred Contact Method",
  },
  notice: {
    subject: "Important Notice - {{propertyAddress}}",
    body: "Dear {{tenantName}},\n\n{{noticeContent}}\n\nIf you have any questions, please contact us at {{contactInfo}}.\n\nSincerely,\n{{ownerName}}\n{{companyName}}",
  },
};
