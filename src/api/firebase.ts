import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseCreds from '../../firebaseCreds.js'


/**
 * The firebase app object. 
 * Use this to avoid loading it multiple times.
 */
try {
const app2 = initializeApp(firebaseCreds/*, "FLAVOURDECK_PRIMARY"*/);
} catch (e) {
    console.log(e);
}
var app
export {app as app2}
/**
 * The database object. 
 * Use this to avoid loading it multiple times.
 */
// 

export const db = getFirestore(app);


/**
 * The auth object.
 * Use this to avoid loading it multiple times.
 */
export const auth = getAuth(app);