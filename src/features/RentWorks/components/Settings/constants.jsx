/**
 * BLANK_PROFILE_FORM_DATA ...
 *
 * form data used to build the user details in settings
 */
export const BLANK_PROFILE_FORM_DATA = {
  first_name: {
    id: "first_name",
    value: "",
    errorMsg: "",
    isRequired: true,
    validators: [
      {
        validate: (value) => value.trim().length <= 3,
        message:
          "First name is required and must be more than three characters",
      },
      {
        validate: (value) => value.trim().length >= 150,
        message: "First name should be less than 150 characters",
      },
    ],
  },
  last_name: {
    id: "last_name",
    value: "",
    errorMsg: "",
    isRequired: true,
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: "Last name is required",
      },
      {
        validate: (value) => value.trim().length >= 150,
        message: "Last name should be less than 150 characters",
      },
    ],
  },
  email: {
    id: "email",
    value: "",
    errorMsg: "",
    isRequired: true,
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: "Email address is required",
      },
      {
        validate: (value) => value.trim().length >= 150,
        message: "Email address should be less than 150 characters",
      },
      {
        validate: (value) => !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(value),
        message: "Email address is not valid",
      },
    ],
  },
  phone: {
    id: "phone",
    value: "",
    errorMsg: "",
    isRequired: true,
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: "Phone Number is required",
      },
      {
        validate: (value) => !/^\d{10}$/.test(value),
        message: "Phone number must be a valid 10-digit number",
      },
    ],
  },
  street_address: {
    id: "street_address",
    value: "",
    errorMsg: "",
    isRequired: true,
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: "Street address is required",
      },
      {
        validate: (value) => value.trim().length >= 150,
        message: "Street address should be less than 150 characters",
      },
    ],
  },
  city: {
    id: "city",
    value: "",
    errorMsg: "",
    isRequired: true,
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: "City is required",
      },
      {
        validate: (value) => value.trim().length >= 150,
        message: "City should be less than 150 characters",
      },
    ],
  },
  state: {
    id: "state",
    value: "",
    errorMsg: "",
    isRequired: true,
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: "State is required in the form of XX",
      },
      {
        validate: (value) => value.trim().length > 2,
        message: "State is required in the form of XX. Eg, AZ",
      },
    ],
  },
  zipcode: {
    id: "zipcode",
    value: "",
    errorMsg: "",
    isRequired: true,
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: "Zip Code is required",
      },
      {
        validate: (value) => !/^\d{5}$/.test(value),
        message: "Zip Code should be within 5 digits",
      },
    ],
  },
  company_name: {
    id: "company_name",
    value: "",
    errorMsg: "",
    isRequired: false,
    validators: [],
  },
};

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
