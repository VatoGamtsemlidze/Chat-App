import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'

const clientCredentials = {
    apiKey: "AIzaSyD-hXugZOTiNCYPDHB780AAlC5hLf7SUkw",
    authDomain: "chatapp-9e536.firebaseapp.com",
    projectId: "chatapp-9e536",
    storageBucket: "chatapp-9e536.appspot.com",
    messagingSenderId: "321426697432",
    appId: "1:321426697432:web:4f0420e20ddb035c2afbad"
};

if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials);
}else {
    firebase.app(); // if already initialized, use that one
}


export default firebase;