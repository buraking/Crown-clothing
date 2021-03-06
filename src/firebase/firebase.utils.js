import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
//import { privateEncrypt } from 'crypto';

const config = {
    apiKey: "AIzaSyC9_I1SWYZfYtmLpUwHx__jtouQd0NXgQ8",
    authDomain: "crwn-db-e3097.firebaseapp.com",
    databaseURL: "https://crwn-db-e3097.firebaseio.com",
    projectId: "crwn-db-e3097",
    storageBucket: "crwn-db-e3097.appspot.com",
    messagingSenderId: "867270304857",
    appId: "1:867270304857:web:0475ba8fd8d8e72ff8bd48",
    measurementId: "G-L9D55JNQCM"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`user/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error){
            console.log('error creating user', error.message);
        }
    }
    
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;