import { authenticatorApp } from "src/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import dayjs from "dayjs";

/**
 * authenticateViaGoogle...
 *
 * function used to login to google. saves user details into
 * local storage
 */
export const authenticateViaGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(authenticatorApp, provider);
  const user = result.user;
  const userDetails = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    provider: user.providerData[0]?.providerId,
    createdAt: dayjs().toISOString(),
  };

  localStorage.setItem("user", JSON.stringify(userDetails));
};
