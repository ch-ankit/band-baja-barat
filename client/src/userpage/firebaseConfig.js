import firebase from "firebase";
const firebaseApp =firebase.initializeApp({
    apiKey: "AIzaSyCCo7nzZ-xb3VbBxehycMv7svduosLnvQg",
    authDomain: "sem-4-e2fd7.firebaseapp.com",
    databaseURL: "https://sem-4-e2fd7.firebaseio.com",
    projectId: "sem-4-e2fd7",
    storageBucket: "sem-4-e2fd7.appspot.com",
    messagingSenderId: "489267624616",
    appId: "1:489267624616:web:a0d7951a86b9897658e09d"

  });

  const db=firebaseApp.firestore();
  const storage=firebase.storage();
  const auth=firebase.auth();

  export {db,storage,auth};