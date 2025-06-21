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
    value: "",
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
  isSoR: {
    id: "isSoR",
    value: false,
    errorMsg: "",
    isRequired: true, // required && default value is by default
    validators: [],
  },
  assignedRoomName: {
    id: "assignedRoomName",
    value: "",
    errorMsg: "",
    isRequired: false,
    validators: [],
  },
};

/**
 * Blank Property Details Form ...
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
