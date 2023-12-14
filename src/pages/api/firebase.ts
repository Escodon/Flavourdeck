import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



let firebaseConfig;

  firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
  };


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