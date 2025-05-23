import { Route } from "react-router-dom";

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
  const invoicerAppSendEmailEnabled = import.meta.env.VITE_ENABLE_EMAIL_FEATURE;

  return new Map([
    ["analytics", invoicerAppAnalyticsEnabled === "true"],
    ["invoicer", invoicerAppEnabled === "true"],
    ["invoicerPro", invoicerAppProFeaturesEnabled === "true"],
    ["userInformation", invoicerAppUserInformationEnabled === "true"],
    ["sendEmail", invoicerAppSendEmailEnabled === "true"],
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

/**
 * buildAppRoutes
 *
 * used to build application level routes based on the passed in available routes.
 * if all required Orgs are met and flags are on, said route is created.
 *
 * @param {Array} draftRoutes - array of draft routes that are within the application
 * @returns Array of Routes with the route element from react router dom.
 */
export function buildAppRoutes(draftRoutes = []) {
  const validRouteFlags = validateClientPermissions();
  return draftRoutes
    .map(({ path, element, requiredFlags }) => {
      const isRequired = isValidPermissions(validRouteFlags, requiredFlags);

      if (!isRequired) return;
      return <Route key={path} exact path={path} element={element} />;
    })
    .filter(Boolean);
}
