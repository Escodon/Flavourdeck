import {
  User,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import log from "../log";
export const runtime = 'edge';


/**
 * Logs out the currently authenticated user.
 */
export async function logoutUser(): Promise<void> {
  log("Logging out user", "logoutUser");

  try {
    await signOut(auth)
    log("User logged out", "logoutUser");
  } catch (error) {
    log(`Error logging out user: ${error}`, "logoutUser");
  }
}

/**
 * Wrapper for firebaokses auth function.
 * @param email The inputted email
 * @param password The inputted password
 * @returns {Promise} .
 */
export async function authUser(email: string, password: string): Promise<any> {
  log(`Authenticating user with email ${email}`, "authUser");
  setPersistence(auth, browserLocalPersistence).then(() => {
    log("Persisitence set to local", "authUser/setPersistence")
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        log(`User with email ${email} authenticated`, "authUser")
        const user = userCredential.user;
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
    return { error: true, code: errorCode, message: errorMessage };
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
      log("User created with email " + email, "newUser")
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      log("Error creating user: " + errorMessage, "newUser")
      return { errorCode, errorMessage };
    });
}

/**
 * User setting interface
 */
export interface UserSettings {
  uid: string,
  email: string,
  displayName: string,
  darkMode: boolean
}

/**
 * Gets the settings of the user.
 * @param UID The User ID to get the settings for
 * @returns JSON object of the users settings
 */
export async function getUserSettings(UID: string) {
  log("Getting user settings for " + UID, "getUserSettings")
  let UsersCollection = collection(db, "users");
  let userSettings: UserSettings = {} as UserSettings;
  const querySnapshot = await getDocs(UsersCollection);
  querySnapshot.forEach((doc) => {
    if (doc.data().uid == UID) {
      userSettings = doc.data() as UserSettings;
    }
  });
  return userSettings;
}

/**
 * Syncs the users settings to the DB
 * @param settings 
 * @returns 
 */
export async function syncUserSettings(settings: UserSettings) {
  log(`Syncing user settings for ${settings.email}`, "syncUserSettings");
  let UsersCollection = collection(db, "users");
  await addDoc(UsersCollection, settings);
  return settings;
}

auth.onAuthStateChanged((user: User | null) => {
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

export async function getPublicUserInfo(uid: string) {
  let UsersCollection = collection(db, "users");
  let userSettings: UserSettings = {} as UserSettings;
  const querySnapshot = await getDocs(UsersCollection);
  querySnapshot.forEach((doc) => {
    if (doc.data().uid == uid) {
      userSettings = doc.data() as UserSettings;
    }
  });
  return userSettings;
}