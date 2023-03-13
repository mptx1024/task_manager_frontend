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
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    login_hint: 'user@example.com',
});

const auth = getAuth(app);

// Firebase Emulator:
// if (process.env.NODE_ENV === 'development') {
//     connectAuthEmulator(auth, 'http://localhost:9099');
// }

const signInWithGoogle = async () => {
    try {
        // https://firebase.google.com/docs/auth/web/google-signin#web-version-9-modular
        const result = await signInWithPopup(auth, provider);
        // The signed-in user info.
        const user = result.user;
        return user;

    } catch (error) {
        // Handle Errors here.
        console.log(error);
    }
};

/**
 * Each time anonymous device log out and log in would get a new anonymous UID
 * This is expected. There is no way to log back in to the "same" anonymous auth account once logged out. If wanting to persist UID, need to create your own fake anonymous auth by making a custom auth token (on your server) for the user and creating some system that allows them to retrieve the same token multiple times on the same device.
 
 */
const signInAnonymous = async () => {
    try {
        const result = await signInAnonymously(auth);
        const user = result.user;
        return user;
    } catch (error) {
        console.log(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;
    }
};

// https://firebase.google.com/docs/auth/web/google-signin#next_steps
const signOutGoogle = async () => {
    try {
        await signOut(auth);
        // Sign-out successful.
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

export { signInWithGoogle, signOutGoogle, signInAnonymous, auth };
