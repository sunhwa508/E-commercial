import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAZEV46O0BzLhuTt6Kd91C51_8hXD2r4xw",
  authDomain: "sumazon-db.firebaseapp.com",
  databaseURL: "https://sumazon-db.firebaseio.com",
  projectId: "sumazon-db",
  storageBucket: "sumazon-db.appspot.com",
  messagingSenderId: "662764230446",
  appId: "1:662764230446:web:5c02a780b7b2fe469b4cbf",
  measurementId: "G-MXPG3XHQSR",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`user/${userAuth.uid}`);
  const snapshot = await userRef.get();


  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
console.log(auth);
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
