# Getting Started with Create React App

## You have to start json server on port 3500 first

-   json-server --watch data/db.json --port 3500

## firebase auth:

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = {
    apiKey: "AIzaSyB-JUzJhtY_-GgqX6YRzfl4pdYjgPn78nA",
    authDomain: "todoauth-3be2c.firebaseapp.com",
    projectId: "todoauth-3be2c",
    storageBucket: "todoauth-3be2c.appspot.com",
    messagingSenderId: "543910468264",
    appId: "1:543910468264:web:140c8ebd455151fad6c09d"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
json-server --watch data/db.json --port 3500