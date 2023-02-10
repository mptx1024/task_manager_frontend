import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    signInAnonymously,
    // connectAuthEmulator,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyB-JUzJhtY_-GgqX6YRzfl4pdYjgPn78nA',
    authDomain: 'todoauth-3be2c.firebaseapp.com',
    projectId: 'todoauth-3be2c',
    storageBucket: 'todoauth-3be2c.appspot.com',
    messagingSenderId: '543910468264',
    appId: '1:543910468264:web:140c8ebd455151fad6c09d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    login_hint: 'user@example.com',
});

const auth = getAuth(app);

// Emulator
// connectAuthEmulator(auth, 'http://localhost:9099');

const signInWithGoogle = async () => {
    try {
        // https://firebase.google.com/docs/auth/web/google-signin#web-version-9-modular
        const result = await signInWithPopup(auth, provider);
        // The signed-in user info.
        // const user = result.user;
        // console.log('🚀 ~ file: firebase.js:29 ~ signInWithGoogle ~ user', user);
        // https://firebase.google.com/docs/reference/js/auth.googleauthprovider#googleauthprovidercredentialfromresult
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
    } catch (error) {
        // Handle Errors here.
        console.log(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // // ...
    }
};

// https://firebase.google.com/docs/auth/web/google-signin#next_steps
const signOutGoogle = async () => {
    try {
        await signOut(auth);
        // Sign-out successful.
    } catch (error) {
        // An error happened.
        console.log(`Error: ${error}`);
    }
};
/**
 * Each time anonymous device log out and log in would get a new anonymous UID
 * This is expected. There is no way to log back in to the "same" anonymous auth account once logged out. If wanting to persist UID, need to create your own fake anonymous auth by making a custom auth token (on your server) for the user and creating some system that allows them to retrieve the same token multiple times on the same device.
 *
 */
const signInAnonymous = async () => {
    try {
        await signInAnonymously(auth);
    } catch (error) {
        console.log(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;
    }
};

export { signInWithGoogle, signOutGoogle, signInAnonymous, auth };
