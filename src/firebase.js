import firebase from 'firebase/app'
// import * firebase from 'firebase/auth/dist/'
import 'firebase/auth'
const configs = {
    apiKey: "AIzaSyAku0BWUm7zjdzQxUeR69wjdgbfRyF6VD4",
    authDomain: "abnaey-589e0.firebaseapp.com",
    projectId: "abnaey-589e0",
    storageBucket: "abnaey-589e0.appspot.com",
    messagingSenderId: "165029478119",
    appId: "1:165029478119:web:f7a6c8fe20f16c5e91ec42",
    measurementId: "G-W2RYQH9TK5"
};
const app = firebase.initializeApp(configs);
export const auth = app.auth();
auth.languageCode = 'it';

auth.setPersistence('local').then(() => {
    console.log("forever")
})
// export const fire= firebase.initializeApp(configs)
// firebase.auth.PhoneAuthProvider
export const googleProvider = new firebase.auth.GoogleAuthProvider();
// export const linkedinProvider = new firebase.auth.LinkedinAuthProvider();
export const phoneProvider = new firebase.auth.PhoneAuthProvider();
// const applyCode = auth.applyActionCode('keneknekn')
export const facebookProvider = new firebase.auth.FacebookAuthProvider();

export default app;
