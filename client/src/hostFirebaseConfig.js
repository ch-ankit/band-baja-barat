import firebase from "firebase";

const firebaseApp1 =firebase.initializeApp({
    apiKey: "AIzaSyDObRlonM25hgf4quxZEDxn8sCmXc9HOnM",
    authDomain: "bandbaja-e7a5d.firebaseapp.com",
    databaseURL: "https://bandbaja-e7a5d.firebaseio.com",
    projectId: "bandbaja-e7a5d",
    storageBucket: "bandbaja-e7a5d.appspot.com",
    messagingSenderId: "337807956382",
    appId: "1:337807956382:web:a37e93757c92c1a84ede8f",
    measurementId: "G-P7G7BY47Y5"
  },'firebase1');

  const Hdb=firebaseApp1.firestore();
  const Hstorage=firebase.storage();
  const Hauth=firebaseApp1.auth();

  export {Hdb,Hstorage,Hauth};