import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import { login } from './authSlice';
import { signInAnonymous } from '../../config/firebase';
import { Box, Divider, Button } from '@mui/material';

import { FacebookLoginButton, GoogleLoginButton, GithubLoginButton } from 'react-social-login-buttons';
import { signInWithGoogle } from '../../config/firebase';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = getAuth();
    const storeUserInState = (authUser) => {
        return dispatch(
            login({
                email: authUser.email,
                firstName: authUser.displayName?.split(' ')[0],
                lastName: authUser.displayName?.split(' ')[1],
                photoUrl: authUser.photoURL
                    ? authUser.photoURL
                    : 'https://winaero.com/blog/wp-content/uploads/2019/09/Chrome-Incognito-Mode-Icon-256.png',
                uid: authUser.uid,
                firebaseIdToken: authUser.accessToken,
                isAnonymous: authUser.isAnonymous, // anonymous login
            })
        );
    };
    // Auto-login and redirect to /all if user was logged in last time
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                console.log('Has currentUser!!', user);
                storeUserInState(user);
                navigate('/all');
            } else {
                console.log(`No current User!!`);
                // User is signed out
                // ...
            }
        });
    }, []);

    const onClickSignInAnonymous = async () => {
        const authUser = await signInAnonymous();
        if (authUser) {
            storeUserInState(authUser);
            // navigate('/all');
        }
    };
    const onGoogleClick = async () => {
        const authUser = await signInWithGoogle();
        if (authUser) {
            storeUserInState(authUser);
            // navigate('/all');
        }
    };
    const onLoginClick = () => {
        alert('Working in progress');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'secondary.light',
                height: '100%',
                width: '100%',
                position: 'fixed',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '25%',
                }}
            >
                <Button onClick={onClickSignInAnonymous} variant='contained' sx={{ color: 'white', mx: '5px' }}>
                    I Want to Use It Anonymously
                </Button>
                <Divider light sx={{ color: 'grey.500', my: '10px', mx: '5px' }}>
                    Or
                </Divider>
                <div style={{ margin: 0, padding: 0 }}>
                    <GoogleLoginButton onClick={onGoogleClick} />
                    <GithubLoginButton onClick={onLoginClick} />
                    <FacebookLoginButton onClick={onLoginClick} />
                </div>
            </Box>
        </Box>
    );
};
export default Login;
