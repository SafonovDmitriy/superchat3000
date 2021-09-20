import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import "firebase/analytics";
firebase.initializeApp({
  apiKey: "AIzaSyBJAP70xiaZV8aanXCZVUAfojHZZMsQy5Q",
  authDomain: "fir-research-3e365.firebaseapp.com",
  databaseURL:
    "https://fir-research-3e365-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-research-3e365",
  storageBucket: "fir-research-3e365.appspot.com",
  messagingSenderId: "228083800316",
  appId: "1:228083800316:web:ff19530fd1664b798ddf79",
  measurementId: "G-YN9GWXRCM9",
});

const auth = firebase.auth();
const firestore = firebase.firestore();
export { auth, firestore };
