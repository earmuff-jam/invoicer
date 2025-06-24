/**
 * Email Validators
 */
const emailValidators = [
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
];

/**
 * isValid ...
 *
 * function used to determine if an email is valid or not
 *
 * @param {string} email
 * @returns boolean - true / false
 */
export const isValid = (email) => {
  for (const validator of emailValidators) {
    if (validator.validate(email)) {
      return false;
    }
  }
  return true;
};

/**
 * fetchLoggedInUser ...
 *
 * used to retrieve the logged in userId.
 *
 * @returns string - the logged in userId
 */
export const fetchLoggedInUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
