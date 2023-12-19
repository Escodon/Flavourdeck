import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



let firebaseConfig;

if (process.env.DEV) {
  firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
  };
} else {
  firebaseConfig = require("../../../firebase.json");
}

/**
 * The firebase app object. 
 * Use this to avoid loading it multiple times.
 */
export const app = initializeApp(firebaseConfig/*fbc2*/);


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