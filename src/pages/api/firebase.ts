import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const fireFile = require("./firebase.json");
const firebaseConfig = {
    apiKey: fireFile.apiKey,
    authDomain: fireFile.authDomain,
    projectId: fireFile.projectId,
    storageBucket: fireFile.storageBucket,
    messagingSenderId: fireFile.messagingSenderId,
    appId: fireFile.appId,
    measurementId: fireFile.measurementId
};

/**
 * The firebase app object. 
 * Use this to avoid loading it multiple times.
 */
export const app = initializeApp(firebaseConfig);

initializeApp();

/**
 * The database object. 
 * Use this to avoid loading it multiple times.
 */
export const db = getFirestore();
