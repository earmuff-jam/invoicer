import dayjs from "dayjs";
import { authenticatorApp } from "src/config";
import { TenantRole } from "src/features/Landing/constants";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

/**
 * authenticateViaGoogle...
 *
 * function used to login to google.
 * @returns {Object} userDetails
 */
export const authenticateViaGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(authenticatorApp, provider);
  const user = result.user;
  const userDetails = {
    uid: user.uid,
    role: user?.role || TenantRole,
    googleEmailAddress: user.email,
    googleDisplayName: user.displayName,
    googlePhotoURL: user.photoURL,
    provider: user.providerData[0]?.providerId,
    googleAccountLinkedAt: dayjs().toISOString(),
    googleLastLoginAt: dayjs().toISOString(),
  };

  return userDetails;
};
