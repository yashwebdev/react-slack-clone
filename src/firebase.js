import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDuVBCmG2kHR0lXe6a8g7Y3SeE3nKSCseM",
    authDomain: "react-slack-clone-fab5c.firebaseapp.com",
    databaseURL: "https://react-slack-clone-fab5c.firebaseio.com",
    projectId: "react-slack-clone-fab5c",
    storageBucket: "react-slack-clone-fab5c.appspot.com",
    messagingSenderId: "1083946510552",
    appId: "1:1083946510552:web:815e1d2fc16e83fd918fad",
    measurementId: "G-5YLSW9VCTW"
};

const myFirebase = firebase.initializeApp(firebaseConfig)

export default myFirebase