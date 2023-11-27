import { initializeApp } from "firebase/app";

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
