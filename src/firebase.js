import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyBCNJRVavzC-7CTdlO98fDo7y3t7kOpFKo",
    authDomain: "reactinstatutorial-6f7c5.firebaseapp.com",
    projectId: "reactinstatutorial-6f7c5",
    storageBucket: "reactinstatutorial-6f7c5.appspot.com",
    messagingSenderId: "243297802688",
    appId: "1:243297802688:web:10d9ab53f5855703859025"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

   const db = firebaseApp.firestore();
   const auth = firebase.auth();
   const storage = firebase.storage();
  const provider= new firebase.auth.GoogleAuthProvider();

  export {db, auth, provider, storage};