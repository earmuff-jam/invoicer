// Template processor utility
export const processTemplate = (template, variables) => {
  let processedTemplate = template;

  // Replace all variables in the format {{variableName}}
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    processedTemplate = processedTemplate.replace(regex, value || "");
  });

  return processedTemplate;
};

export const handleQuickConnectAction = (
  action,
  property,
  primaryTenant,
  templates,
  openMaintenanceForm = () => {},
  openNoticeComposer = () => {}
) => {
  const templateVariables = {
    tenantName: primaryTenant.name,
    propertyAddress: `${property.address}, ${property.city}, ${property.state} ${property.zipcode}`,
    amount: primaryTenant.monthlyRent?.toFixed(2),
    dueDate: primaryTenant.dueDate,
    month: new Date().toLocaleString("default", { month: "long" }),
    year: new Date().getFullYear(),
    ownerName: "Sarah Mitchell", // From your settings
    companyName: "Mitchell Properties LLC", // From your settings
    contactInfo: "sarah.mitchell@propmanagement.com", // From your settings
    paymentLink: "https://yourportal.com/payment", // Your payment portal
    noticeContent: "", // This would be filled when sending a notice
  };

  switch (action) {
    case "CREATE_INVOICE": {
      // const invoiceSubject = processTemplate(
      //   templates.invoice.subject,
      //   templateVariables
      // );
      // const invoiceBody = processTemplate(
      //   templates.invoice.body,
      //   templateVariables
      // );

      // // Open email client or send via your API
      // sendEmail({
      //   to: primaryTenant.email,
      //   subject: invoiceSubject,
      //   body: invoiceBody,
      //   attachments: ["invoice.pdf"], // Generate invoice PDF
      // });
      break;
    }

    case "PAYMENT_REMINDER": {
      const reminderSubject = processTemplate(
        templates.reminder.subject,
        templateVariables
      );
      const reminderBody = processTemplate(
        templates.reminder.body,
        templateVariables
      );

      sendEmail({
        to: primaryTenant.email,
        subject: reminderSubject,
        body: reminderBody,
      });
      break;
    }

    case "MAINTENANCE_REQUEST": {
      // Open maintenance form with tenant info pre-filled
      openMaintenanceForm({
        tenantName: primaryTenant.name,
        tenantEmail: primaryTenant.email,
        propertyAddress: templateVariables.propertyAddress,
        formTemplate: templates.maintenance,
      });
      break;
    }

    case "GENERAL_NOTICE": {
      // Open notice composer with template
      openNoticeComposer({
        tenantName: primaryTenant.name,
        tenantEmail: primaryTenant.email,
        propertyAddress: templateVariables.propertyAddress,
        template: templates.notice,
      });
      break;
    }
  }
};

const sendEmail = ({ to, subject, body, attachments = [] }) => {
  /* eslint-disable no-console */
  console.log("Sending email:", { to, subject, body, attachments });

  // In real app, this would:
  // 1. Call your email API (SendGrid, Mailgun, etc.)
  // 2. Or open user's email client with mailto:
  const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  window.open(mailtoLink);
};
