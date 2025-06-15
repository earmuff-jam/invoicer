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
