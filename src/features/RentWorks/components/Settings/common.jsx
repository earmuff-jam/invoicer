import { Box } from "@mui/material";

/**
 * Types of stripe accounts allowed in the system. This matches
 * the role of the user.
 */
export const TenantStripeAccountType = "Tenant";
export const PropertyOwnerStripeAccountType = "Owner";

/**
 * DefaultTemplateData ...
 *
 * used to create default email templates to send to the client directly.
 */
export const DefaultTemplateData = {
  // invoice template
  invoice: {
    label: "Invoice Template",
    subject: "Monthly Rent Invoice - {{propertyAddress}}",
    body: "Please view your invoice details below",
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <p>{{currentDate}}</p>

  <p>
    To<br />
    <strong>{{tenantName}}</strong><br />
    {{propertyAddress}}
  </p>

  <p>Dear {{tenantName}},</p>

  <p>Please find attached your rent invoice for <strong>{{month}} {{year}}</strong>.</p>

  <p>
    <strong>Property:</strong> {{propertyAddress}}<br />
    <strong>Amount Due:</strong> $ {{amount}}<br />
    <strong>Due Date:</strong> {{dueDate}}
  </p>

  <p>
    Thank you,<br />
    <strong>{{ownerName}}</strong><br />
  </p>
</div>
    `,
  },
  // late payment reminder template
  reminder: {
    label: "Rent Late Payment Reminder Template",
    subject: "Rent Late Payment Reminder - {{propertyAddress}}",
    body: "Please view your late payment reminder",
    html: `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <p>{{currentDate}}</p>

  <p>
    To<br />
    <strong>{{tenantName}}</strong><br />
    <strong>{{propertyAddress}}</strong>
  </p>

  <p>Dear <strong>{{tenantName}}</strong>,</p>

  <p>
    This is a friendly reminder that your rent payment of 
    <strong>$ {{amount}}</strong> was due on <strong>{{dueDate}}</strong>.
  </p>

  <p><strong>Property:</strong> {{propertyAddress}}</p>

  <p>
    Please submit your payment on time to avoid any late fees.
  </p>

  <p>
    Best regards,<br />
    <strong>{{ownerName}}</strong><br />
    {{propertyAddress}}
  </p>
</div>
`,
  },
  // rent regular payment reminder template
  rent: {
    label: "Rent Regular Payment Reminder Template",
    subject: "Rent Payment Reminder - {{propertyAddress}}",
    body: "Please view your regular rent payment reminder",
    html: `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <p>{{currentDate}}</p>

  <p>
    To<br />
    <strong>{{tenantName}}</strong><br />
    <strong>{{propertyAddress}}</strong>
  </p>

  <p>Dear <strong>{{tenantName}}</strong>,</p>

  <p>
    This is a friendly reminder that your rent payment of 
    <strong>$ {{amount}}</strong> is due on <strong>{{dueDate}}</strong>.
  </p>

  <p><strong>Property:</strong> {{propertyAddress}}</p>

  <p>
    Please submit your payment on time to avoid any late fees.
  </p>

  <p>
    Best regards,<br />
    <strong>{{ownerName}}</strong><br />
    {{propertyAddress}}
  </p>
</div>
`,
  },
  // notice of lease renewal template
  noticeOfLeaseRenewal: {
    label: "Notice of Lease Renewal Template",
    subject: "Notice of Lease Expiration and Renewal - {{propertyAddress}}",
    body: "Please view your notice of renewal",
    html: `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <p>{{currentDate}}</p>

  <p style="font-weight: bold;">
    To<br />
    {{tenantName}}<br />
    {{propertyAddress}}
  </p>

  <strong><p> Subject - Notice of lease expiration and renewal </p></strong>

  <p>Dear {{tenantName}},</p>

  <p>
    This letter is being sent to inform you that your current lease at 
    <strong>{{propertyAddress}}</strong> is, as you may be aware, set to expire on 
    <strong>{{leaseEndDate}}</strong>.
  </p>

  <p>Please review the following renewal options, as stipulated in your existing lease agreement:</p>

  <p>
  We have greatly appreciated having you as a tenant, and we would like to extend the opportunity
for you to continue your tenancy at our property. In accordance with the terms of your current
lease agreement, we are providing you with this notice 60 days in advance to discuss the renewal
options.
</p>

  <p>
    <strong>• SEMI ANNUAL LEASE RENEWAL:</strong><br />
    If you choose to switch to a semi-annual lease, please be advised that the monthly rent will increase by 
    {{newSemiAnnualRent}}. This option provides flexibility but comes with a higher monthly cost.
  </p>

  <p style="font-weight: bold;">
    • ONE YEAR LEASE RENEWAL:<br />
    Opting for a one-year lease renewal will result in the following change:
    {{oneYearRentChange}}. This fixed-term option offers stability and predictability for the upcoming year.
  </p>

  <p>
    Please carefully consider the above-mentioned terms and inform us of your decision by 
    <strong>{{responseDeadline}}</strong>. You can contact us at <strong>{{ownerPhone}}</strong> or via email at 
    <strong>{{ownerEmail}}</strong> for any further queries.
  </p>

  <p style="font-weight: bold;">
    Please be advised that all other terms of your original rental agreement remain in effect.<br />
    We value your tenancy and look forward to continuing our positive landlord-tenant relationship.
  </p>

  <p>
    Regards,<br />
    <strong>{{ownerName}}</strong><br />
    <strong>{{propertyAddress}}</strong><br />
  </p>
</div>
`,
  },
};

/**
 * StripeUserStatusEnums
 *
 * enums objects for user status
 */
export const StripeUserStatusEnums = {
  SUCCESS: {
    type: "success",
    label: "Success",
    msg: "Stripe Account is connected and ready",
  },
  FAILURE: {
    type: "error",
    label: "Failed",
    msg: "Stripe account setup is incomplete.",
  },
};

/**
 * StripeUserFailureEnums ...
 *
 * used for reasons for stripe user failures
 */

export const StripeUserFailureEnums = {
  MISSING_BUSINESS_DETAILS:
    "Missing required business or individual information.",
  MISSING_ID_VERIFICATION:
    "Identity verification documents are still pending or missing.",
  MISSING_BANK_ACCOUNT: "Bank account information has not been provided.",
  UNACCEPTED_TOS: "Terms of Service have not been accepted yet.",
  PENDING_STRIPE_REVIEW:
    "Verification is still pending. Ensure you have submitted all your required documents.",
  GENERIC_INCOMPLETE_SETUP:
    "Your Stripe account setup is incomplete. Please finish onboarding.",
};

/**
 * getStripeFailureReasons ...
 *
 * fn used to get the stripe failure reasons.
 *
 * @param {Object} account - the account details of the user
 * @returns
 */
export const getStripeFailureReasons = (account) => {
  const reasons = [];

  const req = account.requirements || {};
  const pending = req.pending_verification || [];
  const due = req.currently_due || [];
  const pastDue = req.past_due || [];

  if (!account.details_submitted) {
    reasons.push(StripeUserFailureEnums.MISSING_BUSINESS_DETAILS);
  }

  if (!account.charges_enabled || !account.payouts_enabled) {
    if (
      pending.includes("individual.id_number") ||
      pending.includes("individual.verification.document") ||
      pastDue.includes("individual.verification.document")
    ) {
      reasons.push(StripeUserFailureEnums.MISSING_ID_VERIFICATION);
    }

    if (
      due.includes("external_account") ||
      pastDue.includes("external_account")
    ) {
      reasons.push(StripeUserFailureEnums.MISSING_BANK_ACCOUNT);
    }

    if (
      due.includes("tos_acceptance.date") ||
      pastDue.includes("tos_acceptance.date")
    ) {
      reasons.push(StripeUserFailureEnums.UNACCEPTED_TOS);
    }

    if (pending.length === 0 && due.length === 0 && pastDue.length === 0) {
      reasons.push(StripeUserFailureEnums.PENDING_STRIPE_REVIEW);
    }

    if (reasons.length === 0) {
      reasons.push(StripeUserFailureEnums.GENERIC_INCOMPLETE_SETUP);
    }
  }

  return reasons;
};

/**
 * processTemplate ...
 *
 * utility file used to process templates with
 * built in variable replacement tool.
 *
 * @param {Object} template - the template literal object
 * @param {Object} variables - the object representation of the variables that can be altered
 *
 * @returns formattedTemplate object
 */
export const processTemplate = (template, variables) => {
  if (typeof template !== "string") {
    /* eslint-disable no-console */
    console.error("Template must be a string. Received:", template);
    return "";
  }

  let processedTemplate = template;

  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    processedTemplate = processedTemplate.replace(regex, value || "");
  });

  return processedTemplate;
};

/**
 * Tab Panel Common Component
 *
 * used to render the tabs for the settings page
 */
export function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}
