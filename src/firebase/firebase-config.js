import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// console.log(process.env)

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
};

// const firebaseConfigTesting = {
//     apiKey: "AIzaSyCR-4NyrgOR4_wsSCjAaAbnYPzxh8qubU0",
//     authDomain: "redux-demo-86507.firebaseapp.com",
//     projectId: "redux-demo-86507",
//     storageBucket: "redux-demo-86507.appspot.com",
//     messagingSenderId: "648839871265",
//     appId: "1:648839871265:web:86cba879a80573538f9c60"
// };

// if ( process.env.NODE_ENV === 'test' ) {
//     // testing
//     firebase.initializeApp(firebaseConfigTesting)
// } else {
//     // dev/prod
//     firebase.initializeApp(firebaseConfig)
// }

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db, 
    googleAuthProvider,
    firebase
}