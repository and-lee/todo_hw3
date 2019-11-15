import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyAMeC72y5aJg6TvruuJtj8LXZ5PIF05v0Y",
    authDomain: "andrlee-todo-rrf.firebaseapp.com",
    databaseURL: "https://andrlee-todo-rrf.firebaseio.com",
    projectId: "andrlee-todo-rrf",
    storageBucket: "andrlee-todo-rrf.appspot.com",
    messagingSenderId: "923453489326",
    appId: "1:923453489326:web:a274073cede0d1acc6ed3f",
    measurementId: "G-WXNYZ14JMQ"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;