import { Navigate } from "react-router-dom";

/**
 * AuthenticationProvider ...
 *
 * Provider Component that allows only logged in users to persist
 * in the page.
 * @param {children} Children - the children component to render
 */
export default function AuthenticationProvider({ children }) {
  const draftUserDetails = localStorage.getItem("user");
  let userDetails;

  try {
    userDetails = JSON.parse(draftUserDetails);
  } catch {
    return <Navigate to="/" replace />;
  }

  return userDetails?.uid ? children : <Navigate to="/" replace />;
}
