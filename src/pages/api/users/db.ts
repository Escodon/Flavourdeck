import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import log from "../log";

const auth = getAuth(app);

/**
 * Wrapper for firebases auth function.
 * @param email The inputted email
 * @param password The inputted password
 * @returns The user object if successful, Error if not.
 */
export function authUser(email: string, password: string) {
  log(`Authenticating user with email ${email}`, 'authUser')
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { errorCode, errorMessage };
    });
}

/**
 * The function to create a new user.
 * @param email The inputted email
 * @param password The inputted password
 * @returns The user object if successful, Error if not.
 */
export function newUser(email: string, password: string) {
  log(`Creating user with email ${email}`, 'newUser')
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      log("Complete.", 'newUser')
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { errorCode, errorMessage };
    });
}
