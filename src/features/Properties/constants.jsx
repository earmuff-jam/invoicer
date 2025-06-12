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
        validate: (val) => val.trim() === "",
        message: "State is required",
      },
    ],
  },
  zipcode: {
    value: "",
    isRequired: true,
    errorMsg: "",
    validators: [
      {
        validate: (val) => !/^\d{5}$/.test(val),
        message: "ZIP code must be 5 digits",
      },
    ],
  },
  owner_email: {
    value: "",
    isRequired: true,
    errorMsg: "",
    validators: [
      {
        validate: (val) =>
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val),
        message: "Invalid email format",
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
