import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration, this basically ensures that we are communicating to the correct online instance
const firebaseConfig = {
  apiKey: "AIzaSyCN0HVHxObrYlbDV7C7tFk4eNkzIBYUHKQ",
  authDomain: "crwn-clothing-db-8607e.firebaseapp.com",
  projectId: "crwn-clothing-db-8607e",
  storageBucket: "crwn-clothing-db-8607e.appspot.com",
  messagingSenderId: "610992785743",
  appId: "1:610992785743:web:a9353e8512924f5a50dd3a",
};

// initializeApp is part of the SDK which contains all the funtions and methods we need, to perform on our unique instance
const firebasApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

//Everything previously basically allows us to access the db we created
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const ccreatedAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        ccreatedAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmailAndPasswordAnonymously = async (
  email,
  password
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

//Upload json to fire store

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  //create the collection
  const collectionReference = collection(db, collectionKey);

  //now we need to save the document into the db, we need to use a transaction as multiple units of work (aka the creating of the collection) needs to be completed in order to complete this
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionReference, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");

  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};
