import dayjs from "dayjs";

/**
 * Enum Constants ...
 */
export const AddPropertyTextString = "ADD_PROPERTY";
export const AssociatePropertyTextString = "ASSOCIATE_PROPERTY";

/**
 * LEASE_TERM_MENU_OPTIONS ...
 */
export const LEASE_TERM_MENU_OPTIONS = [
  {
    id: 1,
    value: "1m",
    label: "1 month",
  },
  {
    id: 2,
    value: "2m",
    label: "2 months",
  },
  {
    id: 3,
    value: "3m",
    label: "3 months",
  },
  {
    id: 4,
    value: "6m",
    label: "6 months",
  },
  {
    id: 5,
    value: "1y",
    label: "1 year",
  },
  {
    id: 6,
    value: "2y",
    label: "2 years",
  },
];

/**
 * BLANK_ASSOCIATE_TENANT_DETAILS ...
 */
export const BLANK_ASSOCIATE_TENANT_DETAILS = {
  email: {
    value: "",
    type: "string",
    isRequired: true,
    errorMsg: "",
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: "Value is required",
      },
      {
        validate: (value) => value.trim().length >= 150,
        message: "Value should be less than 150 characters",
      },
      {
        validate: (value) => !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(value),
        message: "Value is not valid",
      },
    ],
  },
  start_date: {
    id: "start_date",
    type: "string",
    value: dayjs().toISOString(), // default value; prevents leak
    errorMsg: "",
    isRequired: true,
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: "Value is required",
      },
      {
        validate: (value) => value.trim().length >= 15,
        message: "Value should be less than 15 characters",
      },
    ],
  },
  term: {
    id: "term",
    type: "string",
    value: "",
    errorMsg: "",
    isRequired: true,
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: "Value is required",
      },
    ],
  },
  rent: {
    id: "rent",
    value: "",
    errorMsg: "",
    isRequired: true,
    validators: [
      {
        validate: (value) => !/^\d+(\.\d{1,2})?$/.test(value),
        message: "Value must be a valid number with up to two decimal places",
      },
      {
        validate: (value) => parseFloat(value) <= 0,
        message: "Value must be greater than 0",
      },
    ],
  },
  tax_rate: {
    id: "tax_rate",
    value: "",
    errorMsg: "",
    isRequired: false,
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: "Value is required",
      },
      {
        validate: (value) => value.trim().length >= 5,
        message: "Value should be less than 5 characters",
      },
      {
        validate: (value) => !/^\d{1,2}(\.\d{1,2})?$/.test(value),
        message: "Value should be a valid tax rate (e.g., 7.25)",
      },
    ],
  },
  isPrimary: {
    id: "isPrimary",
    type: "boolean",
    value: false,
    errorMsg: "",
    isRequired: true,
    validators: [],
  },
  isSoR: {
    id: "isSoR",
    type: "boolean",
    value: false,
    errorMsg: "",
    isRequired: true,
    validators: [],
  },
  assignedRoomName: {
    id: "assignedRoomName",
    type: "string",
    value: "",
    errorMsg: "",
    isRequired: false,
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: "Value is required",
      },
    ],
  },
};

/**
 * BLANK_PROPERTY_DETAILS ...
 */
export const BLANK_PROPERTY_DETAILS = {
  name: {
    value: "",
    isRequired: true,
    errorMsg: "",
    validators: [
      {
        validate: (val) => val.trim() === "",
        message: "Property name is required",
      },
      {
        validate: (value) => value.trim().length >= 150,
        message: "Property name should be less than 150 characters",
      },
    ],
  },
  address: {
    value: "",
    isRequired: true,
    errorMsg: "",
    validators: [
      {
        validate: (val) => val.trim() === "",
        message: "Address is required",
      },
    ],
  },
  city: {
    value: "",
    isRequired: true,
    errorMsg: "",
    validators: [
      {
        validate: (val) => val.trim() === "",
        message: "City is required",
      },
    ],
  },
  apt: {
    value: "",
    isRequired: false,
    errorMsg: "",
    validators: [],
  },
  state: {
    value: "",
    isRequired: true,
    errorMsg: "",
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
    value: "",
    isRequired: true,
    errorMsg: "",
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
  owner_email: {
    value: "",
    isRequired: true,
    errorMsg: "",
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
  units: {
    value: "",
    isRequired: true,
    errorMsg: "",
    validators: [
      {
        validate: (val) => val !== "" && isNaN(Number(val)),
        message: "Units must be a number",
      },
      {
        validate: (val) => Number(val) && val > 100,
        message: "Bedroom / Units number limit reached",
      },
    ],
  },
  bathrooms: {
    value: "",
    isRequired: true,
    errorMsg: "",
    validators: [
      {
        validate: (val) => val !== "" && isNaN(Number(val)),
        message: "Bathrooms must be a number",
      },
      {
        validate: (val) => Number(val) && val > 100,
        message: "Bathroom number limit reached",
      },
    ],
  },
};
