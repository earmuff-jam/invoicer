/**
 * Utility file for properties
 */

import dayjs from "dayjs";

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

/**
 * updateDateTime function
 *
 * util function used to updateDateTime. used to update the
 * next projected rent due date
 *
 * @param {string} startDate - the start date of the event
 * @returns updatedDateTime with a month added.
 */
export const updateDateTime = (startDate) => {
  const today = dayjs();
  const monthsSinceStart = today.diff(startDate, "month");
  const nextDueDate = startDate.add(monthsSinceStart + 1, "month");
  return dayjs(nextDueDate).toISOString();
};

/**
 * formatCurrency ...
 *
 * used to format the current passed in amount.
 *
 * @param {Number} amount - the amount that needs to be formatted, default 0
 *
 * @returns {Number} formatted result
 */
export const formatCurrency = (amt = 0) => {
  return `$${parseInt(amt).toLocaleString()}`;
};

/**
 * derieveTotalRent
 *
 * function used to retrieve the total rent of any given property. For homes
 * with a SoR, rent are calculated per room. The property unit as a whole can have
 * additional charges.
 *
 * @param {Object} property - the property object
 * @param {Array} tenants - the array of tenants that are residing in the property
 * @param {Boolean} isAnyTenantSoR - true / false - determine if the property is single occupancy or not
 *
 * @returns {Number} - amount of rent in US Dollars
 */
export const derieveTotalRent = (property, tenants, isAnyTenantSoR) => {
  const totalRent =
    parseFloat(property?.rent) + parseFloat(property?.additional_rent); // can have additional charges

  if (isAnyTenantSoR) {
    return tenants.reduce(
      (total, tenant) =>
        total +
        parseInt(tenant.rent || 0) +
        parseInt(property?.additional_rent),
      0
    );
  } else {
    return totalRent || 0;
  }
};

/**
 * getOccupancyRate ...
 *
 * function used to determine the occupancy rate of the selected
 * property.
 *
 * @param {Object} property - the property object
 * @param {Array} tenants - the array of tenants that are residing in the property
 * @param {Boolean} isAnyTenantSoR - true / false - determine if the property is single occupancy or not
 *
 * @returns {Number} - the percent of the occupancy of the selected property
 */
export const getOccupancyRate = (property, tenants, isAnyTenantSoR) => {
  if (isAnyTenantSoR) {
    const totalUnits = parseInt(property?.units || 0);
    const occupiedUnits = tenants.length;
    return totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
  } else {
    return tenants?.length;
  }
};
