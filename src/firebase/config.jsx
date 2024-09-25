
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"

import "firebase/compat/storage"


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: "AIzaSyDNa32LHLNBOTf-p8Hg-W_c9UP_q1AiN9M",
  authDomain: "olx1-45afa.firebaseapp.com",
  databaseURL: "https://olx1-45afa-default-rtdb.firebaseio.com",
  projectId: "olx1-45afa",
  storageBucket: "olx1-45afa.appspot.com",
  messagingSenderId: "981560693520",
  appId: "1:981560693520:web:c6254cc2938b162b634b95",
  measurementId: "G-4XCXW8P1HD"
};


 export default firebase.initializeApp(firebaseConfig)
