import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import fireFile from "../../../firebase.json";

let firebaseConfig;

if (process.env.NODE_ENV === 'production') {
  // In a production environment, use environment variables
  firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };
} else {
  // In a local environment, use the firebase.json file
  firebaseConfig = {
    apiKey: fireFile.apiKey,
    authDomain: fireFile.authDomain,
    projectId: fireFile.projectId,
    storageBucket: fireFile.storageBucket,
    messagingSenderId: fireFile.messagingSenderId,
    appId: fireFile.appId,
    measurementId: fireFile.measurementId
  };
}

/**
 * The firebase app object. 
 * Use this to avoid loading it multiple times.
 */
export const app = initializeApp(firebaseConfig);


/**
 * The database object. 
 * Use this to avoid loading it multiple times.
 */
export const db = getFirestore();

/**
 * The auth object.
 * Use this to avoid loading it multiple times.
 */
export const auth = getAuth(app);