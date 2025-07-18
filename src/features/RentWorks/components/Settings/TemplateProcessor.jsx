import dayjs from "dayjs";

import validateClientPermissions from "common/ValidateClientPerms";
import {
  CreateInvoiceEnumValue,
  PaymentReminderEnumValue,
  RenewLeaseNoticeEnumValue,
  SendDefaultInvoiceEnumValue,
  stripHTMLForEmailMessages,
} from "features/RentWorks/common/utils";
import { processTemplate } from "features/RentWorks/components/Settings/common";

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
) => {
  const templateVariables = {
    leaseEndDate: dayjs(), // the day the lease ends
    newSemiAnnualRent: property?.newSemiAnnualRent || "",
    oneYearRentChange: property?.onYearRentChange || "",
    responseDeadline: property?.newLeaseResponseDeadline || '',
    ownerPhone: propertyOwner?.phone,
    ownerEmail: propertyOwner?.email,
    currentDate: dayjs().format("MMMM DD, YYYY"),
    tenantName: primaryTenant?.name || "Rentee",
    propertyAddress: `${property.address}, ${property.city}, ${property.state} ${property.zipcode}`,
    amount: totalRentAmount,
    dueDate: monthlyRentalDueDate,
    month: dayjs().format("MMMM"),
    year: dayjs().get("year"),
    ownerName: propertyOwner?.googleDisplayName,
    companyName: propertyOwner?.company_name || "",
    contactInfo: propertyOwner?.email || "",
  };

  switch (action) {
    case CreateInvoiceEnumValue: {
      redirectTo("/invoice/edit");
      break;
    }

    case SendDefaultInvoiceEnumValue: {
      const invoiceSubject = processTemplate(
        templates.invoice.subject,
        templateVariables,
      );
      const invoiceBody = processTemplate(
        templates.invoice.body,
        templateVariables,
      );
      const invoiceHtml = processTemplate(
        templates.invoice.html,
        templateVariables,
      );
      formatEmail(
        {
          to: primaryTenant.email,
          subject: invoiceSubject,
          body: invoiceBody,
          html: invoiceHtml,
        },
        sendEmail,
      );
      break;
    }

    case PaymentReminderEnumValue: {
      const reminderSubject = processTemplate(
        templates.reminder.subject,
        templateVariables,
      );
      const reminderBody = processTemplate(
        templates.reminder.body,
        templateVariables,
      );
      const invoiceHtml = processTemplate(
        templates.reminder.html,
        templateVariables,
      );

      formatEmail(
        {
          to: primaryTenant.email,
          subject: reminderSubject,
          body: reminderBody,
          html: invoiceHtml,
        },
        sendEmail,
      );
      break;
    }

    case RenewLeaseNoticeEnumValue: {
      const reminderSubject = processTemplate(
        templates.noticeOfLeaseRenewal.subject,
        templateVariables,
      );
      const reminderBody = processTemplate(
        templates.noticeOfLeaseRenewal.body,
        templateVariables,
      );
      const reminderHtml = processTemplate(
        templates.noticeOfLeaseRenewal.html,
        templateVariables,
      );

      formatEmail(
        {
          to: primaryTenant.email,
          subject: reminderSubject,
          body: reminderBody,
          html: reminderHtml,
        },
        sendEmail,
      );
      break;
    }
  }
};

/**
 * formatEmail ...
 *
 * function used to send email via sendEmail functionality
 * @param {Object} userInformation - object containing reciever information
 */
const formatEmail = ({ to, subject, body, html }, sendEmail) => {
  const userEnabledFlagMap = validateClientPermissions();
  const isSendEmailFeatureEnabled = userEnabledFlagMap.get("sendEmail");

  // if client has ability to send email, use that
  if (isSendEmailFeatureEnabled) {
    sendEmail({
      to: to,
      subject: subject,
      text: stripHTMLForEmailMessages(body),
      html: html,
    });
  } else {
    const plainTextBody = stripHTMLForEmailMessages(body);
    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(plainTextBody)}`;

    window.open(mailtoLink);
  }
};
