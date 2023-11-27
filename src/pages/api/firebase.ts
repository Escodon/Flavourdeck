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

export const app = initializeApp(firebaseConfig);

initializeApp();

export const db = getFirestore();
