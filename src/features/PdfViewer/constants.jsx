export const GENERIC_FORM_FIELDS = {
  type: "text",
  variant: "outlined",
};

export const TEXTAREA_FORM_FIELDS = {
  multiline: true,
  minRows: 4,
  variant: "outlined",
};

/**
 * Blank Invoice Details form
 */
export const BLANK_INVOICE_DETAILS_FORM = {
  title: {
    id: "title",
    value: "",
    errorMsg: "",
    validators: [],
  },
  caption: {
    id: "caption",
    value: "",
    errorMsg: "",
    validators: [],
  },
  note: {
    id: "note",
    value: "",
    errorMsg: "",
    validators: [
      {
        validate: (value) => value.trim().length >= 150,
        message: "Notes should be less than 150 characters",
      },
    ],
    ...TEXTAREA_FORM_FIELDS,
  },
  start_date: {
    id: "start_date",
    value: "",
    errorMsg: "",
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: "Start Date is required",
      },
      {
        validate: (value) => value.trim().length >= 15,
        message: "Start Date should be less than 15 characters",
      },
    ],
  },
  end_date: {
    id: "end_date",
    value: "",
    errorMsg: "",
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: "End date is required",
      },
      {
        validate: (value) => value.trim().length >= 150,
        message: "End date should be less than 150 characters",
      },
    ],
  },
  tax_rate: {
    id: "tax_rate",
    value: "",
    errorMsg: "",
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: "Tax rate is required",
      },
      {
        validate: (value) => value.trim().length >= 5,
        message: "Tax rate should be less than 5 characters",
      },
      {
        validate: (value) => !/^\d{1,2}(\.\d{1,2})?$/.test(value),
        message: "Tax rate should be a valid tax rate (e.g., 7.25)",
      },
    ],
  },
  invoice_header: {
    id: "invoice_header",
    value: "",
    errorMsg: "",
    validators: [],
  },
};

/**
 * Blank Invoice Details form
 */
export const BLANK_INVOICE_LINE_ITEM_FORM = {
  descpription: {
    id: "descpription",
    value: "",
    errorMsg: "",
    validators: [],
  },
  caption: {
    id: "caption",
    value: "",
    errorMsg: "",
    validators: [],
  },
  quantity: {
    id: "quantity",
    value: "",
    errorMsg: "",
    validators: [
      {
        validate: (value) => !/^\d+$/.test(value),
        message: "Quantity must be a positive integer",
      },
      {
        validate: (value) => parseInt(value, 10) > 9999,
        message: "Quantity should be less than or equal to 9999",
      },
    ],
  },
  price: {
    id: "price",
    value: "",
    errorMsg: "",
    validators: [
      {
        validate: (value) => !/^\d+(\.\d{1,2})?$/.test(value),
        message: "Price must be a valid number with up to two decimal places",
      },
      {
        validate: (value) => parseFloat(value) <= 0,
        message: "Price must be greater than 0",
      },
    ],
  },
  payment: {
    id: "payment",
    value: "",
    errorMsg: "",
    validators: [
      {
        validate: (value) => !/^\d+(\.\d{1,2})?$/.test(value),
        message: "Payment must be a valid number with up to two decimal places",
      },
      {
        validate: (value) => parseFloat(value) <= 0,
        message: "Payment must be greater than 0",
      },
    ],
  },
  payment_method: {
    id: "payment_method",
    value: "",
    errorMsg: "",
    validators: [
      {
        validate: (value) => value.trim().length <= 0,
        message: "Method of payment is required",
      },
      {
        validate: (value) => value.trim().length >= 150,
        message: "Method of payment should be less than 150 characters",
      },
    ],
  },
};
