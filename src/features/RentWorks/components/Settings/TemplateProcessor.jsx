import dayjs from "dayjs";

import validateClientPermissions from "common/ValidateClientPerms";
import {
  CreateInvoiceEnumValue,
  PaymentReminderEnumValue,
  RenewLeaseNoticeEnumValue,
  SendDefaultInvoiceEnumValue,
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
    newSemiAnnualRent: "",
    oneYearRentChange: "",
    responseDeadline: "",
    ownerPhone: "",
    ownerEmail: "",
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
      const reminderSubject = processTemplate(
        templates.invoice.subject,
        templateVariables,
      );
      const reminderBody = processTemplate(
        templates.invoice.body,
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

    case PaymentReminderEnumValue: {
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

    case RenewLeaseNoticeEnumValue: {
      const reminderSubject = processTemplate(
        templates.noticeOfLeaseRenewal.subject,
        templateVariables,
      );
      const reminderBody = processTemplate(
        templates.noticeOfLeaseRenewal.body,
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
  }
};

/**
 * formatEmail ...
 *
 * function used to send email via sendEmail functionality
 * @param {Object} userInformation - object containing reciever information
 */
const formatEmail = ({ to, subject, body }, sendEmail) => {
  const userEnabledFlagMap = validateClientPermissions();
  const isSendEmailFeatureEnabled = userEnabledFlagMap.get("sendEmail");

  // if client has ability to send email, use that
  if (isSendEmailFeatureEnabled) {
    sendEmail({
      to: to,
      subject: subject,
      text: body,
    });
  } else {
    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  }
};
