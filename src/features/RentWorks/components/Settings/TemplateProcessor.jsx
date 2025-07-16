import dayjs from "dayjs";

import validateClientPermissions from "common/ValidateClientPerms";

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
  totalRentAmount,
  monthlyRentalDueDate,
  primaryTenant,
  propertyOwner,
  templates,
  redirectTo,
  sendEmail,
  openMaintenanceForm = () => {},
  openNoticeComposer = () => {},
) => {
  const templateVariables = {
    tenantName: primaryTenant?.name || "Rentee",
    propertyAddress: `${property.address}, ${property.city}, ${property.state} ${property.zipcode}`,
    amount: totalRentAmount,
    dueDate: monthlyRentalDueDate,
    month: dayjs().format("MMMM"),
    year: dayjs().get("year"),
    ownerName: propertyOwner?.googleDisplayName,
    companyName: propertyOwner?.company_name || "",
    contactInfo: propertyOwner?.email || "",
    paymentLink: "/rental",
    noticeContent: "", // used for sending a notice
  };

  switch (action) {
    case "CREATE_INVOICE": {
      redirectTo("/invoice/edit");
      break;
    }

    case "PAYMENT_REMINDER": {
      const reminderSubject = processTemplate(
        templates.reminder.subject,
        templateVariables,
      );
      const reminderBody = processTemplate(
        templates.reminder.body,
        templateVariables,
      );

      formatEmail(
        {
          to: primaryTenant.email,
          subject: reminderSubject,
          body: reminderBody,
        },
        sendEmail,
      );
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

/**
 * formatEmail ...
 *
 * function used to send email via sendEmail functionality
 * @param {*} param0
 */
const formatEmail = ({ to, subject, body, /* attachments = [] */ }, sendEmail) => {
  const userEnabledFlagMap = validateClientPermissions();
  const isSendEmailFeatureEnabled = userEnabledFlagMap.get("sendEmail");

  // if client has ability to send email, use that
  if (isSendEmailFeatureEnabled) {
    sendEmail({
      to: to,
      subject: subject,
      text: "", // empty text field
      // html: generateInvoiceHTML(recieverInfo, data, draftInvoiceStatusLabel),
    });
  } else {
    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  }
};
