/**
 * validateClientPermissions ...
 *
 * function that validates client permissions to view certain aspects of the application.
 * This is similar to feature flags or access control based on server location.
 *
 * @returns Map of all valid client permissions
 */
export default function validateClientPermissions() {
  const invoicerAppAnalyticsEnabled = import.meta.env.VITE_ENABLE_ANALYTICS;
  const invoicerAppEnabled = import.meta.env.VITE_ENABLE_INVOICER;
  const invoicerAppProFeaturesEnabled = import.meta.env
    .VITE_ENABLE_INVOICER_PRO;
  const invoicerAppUserInformationEnabled = import.meta.env
    .VITE_ENABLE_INVOICER_USER_INFORMATION;

  return new Map([
    ["analytics", invoicerAppAnalyticsEnabled === "true"],
    ["invoicer", invoicerAppEnabled === "true"],
    ["invoicerPro", invoicerAppProFeaturesEnabled === "true"],
    ["userInformation", invoicerAppUserInformationEnabled === "true"],
  ]);
}

/**
 * isValidPermissions
 *
 * used to determine if a feature is available to the client or not
 *
 * @param {Array} validRouteFlags Array of string of valid routes that the user can work with
 * @param {Array} requiredFlags Array of string of required routes that the user needs to work with
 *
 * @returns boolean value of true / false based on if the user can access feature or not
 */
export function isValidPermissions(validRouteFlags = [], requiredFlags = []) {
  const isRequired = requiredFlags?.every((routeFeature) => {
    return validRouteFlags?.get(routeFeature);
  });

  return isRequired;
}
