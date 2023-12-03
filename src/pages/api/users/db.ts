import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { app, db } from "../firebase";
import log from "../log";

const auth = getAuth(app);

/**
 * Wrapper for firebases auth function.
 * @param email The inputted email
 * @param password The inputted password
 * @returns {JSON} .
 */
export function authUser(email: string, password: string) {
  log(`Authenticating user with email ${email}`, "authUser");
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return {error: false, user};
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return Error(errorCode, errorMessage);
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
