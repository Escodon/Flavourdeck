import {
  User,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import log from "../log";


/**
 * Wrapper for firebaokses auth function.
 * @param email The inputted email
 * @param password The inputted password
 * @returns {Promise} .
 */
export async function authUser(email: string, password: string, router: any): Promise<any> {
  log(`Authenticating user with email ${email}`, "authUser");
  setPersistence(auth, browserLocalPersistence).then(() => {
    log("Persisitence set to local", "authUser/setPersistence")
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      log(`User with email ${email} authenticated`, "authUser")
      const user = userCredential.user;
      //log("DEBUG: " + JSON.stringify(userCredential), "authUser")
      router.push("/settings?uid=" + user.uid);
      return { error: false, user };
    })
    .catch((error) => {
      log(`User with email ${email} failed to authenticate. Error: ${error.message}`, "authUser")
      const errorCode = error.code;
      const errorMessage = error.message;
      return { error: true, code: errorCode, message: errorMessage };
    });
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}



/**
 * The function to create a new user & add them to the db.
 * @param email The inputted email
 * @param password The inputted password
 * @returns The user object if successful, Error if not.
 */
export async function newUser(email: string, password: string, router:any) {
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
      router.push("/settings?uid=" + uid);
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { errorCode, errorMessage };
    });
}

export interface UserSettings {
  uid: string,
  email: string,
  displayName: string,
  darkMode: boolean
}


/**
 * Syncs the users settings to the DB
 * @param settings 
 * @returns 
 */
export async function syncUserSettings(settings:UserSettings) {
  log(`Syncing user settings for ${settings.email}`, "syncUserSettings");
  let UsersCollection = collection(db, "users");
  await addDoc(UsersCollection, settings);
  return settings;
}

auth.onAuthStateChanged((user: User | null) => {
  console.log(user?.displayName)
  listenForUserFnArray.forEach((fn) => { fn(user) })
})

var listenForUserFnArray: Array<(user: User | null) => void> = []


/**
 * @description Add a listener for when a user auth state change is observed. It'll be passed the new user data.
 * @param callbackFn The callback function to be run when a user auth state change is observed.
 */
export function listenForUser(callbackFn: (user: User | null) => void) {
  listenForUserFnArray.push(callbackFn)
}

