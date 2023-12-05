import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { createContext } from 'react';
import { app, db } from "../firebase";
import log from "../log";

interface UserContextType {
  user: any;
  setUser: (user: any) => void;
}

// The user context, used to store the user object globally.
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {} // This is a placeholder, it will be overridden by the actual setUser function
});const auth = getAuth(app);
/**
 * Wrapper for firebases auth function.
 * @param email The inputted email
 * @param password The inputted password
 * @returns {Promise} .
 */
export async function authUser(email: string, password: string, router:any): Promise<any> {
  log(`Authenticating user with email ${email}`, "authUser");
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      log(`User with email ${email} authenticated`, "authUser")
      const user = userCredential.user;
      log("DEBUG: " + JSON.stringify(userCredential), "authUser")
      router.push("/settings?uid=" + user.uid);
      return {error: false, user};
    })
    .catch((error) => {
      log(`User with email ${email} failed to authenticate. Error: ${error.message}`, "authUser")
      const errorCode = error.code;
      const errorMessage = error.message;
      return {error: true, code: errorCode, message: errorMessage};
    });
}



/**
 * The function to create a new user & add them to the db.
 * @param email The inputted email
 * @param password The inputted password
 * @returns The user object if successful, Error if not.
 */
export async function newUser(email: string, password: string) {
  log(`Creating user with email ${email}`, "newUser");
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed up
      let user = userCredential.user;
      let email = user.email;
      let displayName = user.displayName;
      let uid = user.uid;
      let UsersCollection = collection(db, "users");
      await addDoc(UsersCollection, { uid, email, displayName });
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { errorCode, errorMessage };
    });
}
