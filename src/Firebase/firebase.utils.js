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
  const collectionRef = firestore.collection("users");

  const snapShot = await userRef.get();
  const collectionSnapshot = await collectionRef.get();

  console.log({ collection: collectionSnapshot.docs.map((doc) => doc.data()) });

  if (!snapShot.exists) {
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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDeRef = collectionRef.doc();
    batch.set(newDeRef, obj);
  });
  return await batch.commit();
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export default firebase;
