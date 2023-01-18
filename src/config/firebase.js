import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

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

const auth = getAuth();

const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // console.log(`token: ${token}; user: ${JSON.stringify(user)}`);
    } catch (error) {
        // Handle Errors here.
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    }
};

const signOutGoogle = async () => {
    try {
        const isSignedOut = await signOut(auth);
        // Sign-out successful.
        console.log(`Sign-out Successfully. isSignedOut resolves to ${isSignedOut}`);
    } catch (error) {
        // An error happened.
        console.log(`Error: ${error}`);
    }
};

export { signInWithGoogle, signOutGoogle };
