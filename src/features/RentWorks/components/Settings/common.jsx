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
    body: `{{currentDate}}

To  
{{tenantName}}  
{{propertyAddress}}  

Dear {{tenantName}},  

Please find attached your rent invoice for {{month}} {{year}}.  

Property: {{propertyAddress}}  
Amount Due: $ {{amount}}  
Due Date: {{dueDate}}  

Thank you,  
{{ownerName}}  
{{companyName}}`,
  },
  // late payment reminder template
  reminder: {
    label: "Rent Late Payment Reminder Template",
    subject: "Rent Late Payment Reminder - {{propertyAddress}}",
    body: `{{currentDate}}

To  
{{tenantName}}  
{{propertyAddress}}  

Dear {{tenantName}},  

This is a friendly reminder that your rent payment of $ {{amount}} was due on {{dueDate}}.  

Property: {{propertyAddress}}  

Please submit your payment as soon as possible to avoid late fees.  

If you have already made this payment, please disregard this notice.  

Best regards,  
{{ownerName}}  
{{propertyAddress}}`,
  },
  // rent regular payment reminder template
  rent: {
    label: "Rent Regular Payment Reminder Template",
    subject: "Rent Payment Reminder - {{propertyAddress}}",
    body: `{{currentDate}}

To  
{{tenantName}}  
{{propertyAddress}}  

Dear {{tenantName}},  

This is a friendly reminder that your rent payment of $ {{amount}} is due on {{dueDate}}.  

Property: {{propertyAddress}}  

Please submit your payment on time to avoid any late fees.  

Best regards,  
{{ownerName}}`,
  },
  // notice of lease renewal template
  noticeOfLeaseRenewal: {
    label: "Notice of Lease Renewal Template",
    subject: "Notice of Lease Expiration and Renewal - {{propertyAddress}}",
    body: `{{currentDate}}

To  
{{tenantName}}  
{{propertyAddress}}  

Dear {{tenantName}},  

This letter is being sent to inform you that your current lease at {{propertyAddress}} is, as you may be aware, set to expire on {{leaseEndDate}}.

Please review the following renewal options, as stipulated in your existing lease agreement:  

• SEMI ANNUAL LEASE RENEWAL:  
If you choose to switch to a semi-annual lease, please be advised that the monthly rent will increase by {{newSemiAnnualRent}}. This option provides flexibility but comes with a higher monthly cost.  

• ONE YEAR LEASE RENEWAL:
Opting for a one-year lease renewal will result in the following change: {{oneYearRentChange}}. This fixed-term option offers stability and predictability for the upcoming year.  

Please carefully consider the above-mentioned terms and inform us of your decision by {{responseDeadline}}. You can contact us at {{ownerPhone}} or via email at {{ownerEmail}} for any further queries.  

Please be advised that all other terms of your original rental agreement remain in effect.  

We value your tenancy and look forward to continuing our positive landlord-tenant relationship.  

Regards,  
{{ownerName}}  
{{propertyAddress}}`,
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
