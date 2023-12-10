import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import log from "../api/log";
export const runtime = 'edge';
let fireFile;
console.log(process.env.E)

try {
  fireFile = require("../../../firebase.json"); //yes viggo i need to use require ;)
} catch (error) {
  fireFile = {};
}
let firebaseConfig;

if (process.env.E != null) {
    console.log("Using production environment", "firefile")
  // In a production environment, use environment variables
  firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
  };
  log("Firebase config: " + JSON.stringify(firebaseConfig), "firefile")
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