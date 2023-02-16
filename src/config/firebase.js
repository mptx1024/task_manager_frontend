import { initializeApp } from 'firebase/app';

import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    signInAnonymously,
    connectAuthEmulator,
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

// Emulator:
// if (process.env.NODE_ENV === 'development') {
//     connectAuthEmulator(auth, 'http://localhost:9099');
// }

// const dispatch = useDispatch();
// const setUserState = (authUser) => {
//     dispatch(
//         login({
//             email: authUser.email,
//             firstName: authUser.displayName?.split(' ')[0],
//             lastName: authUser.displayName?.split(' ')[1],
//             photoUrl: authUser.photoURL,
//             uid: authUser.uid,
//             firebaseIdToken,
//             isAnonymous: authUser.email ? false : true, // anonymous login
//         })
//     );
// };

const signInWithGoogle = async () => {
    try {
        // https://firebase.google.com/docs/auth/web/google-signin#web-version-9-modular
        const result = await signInWithPopup(auth, provider);
        // The signed-in user info.
        const user = result.user;
        return user;

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

/**
 * Each time anonymous device log out and log in would get a new anonymous UID
 * This is expected. There is no way to log back in to the "same" anonymous auth account once logged out. If wanting to persist UID, need to create your own fake anonymous auth by making a custom auth token (on your server) for the user and creating some system that allows them to retrieve the same token multiple times on the same device.
 *
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
