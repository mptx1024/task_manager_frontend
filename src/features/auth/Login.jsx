import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from './authSlice';
import { useLoginQuery } from './authApiSlice';
import { signInAnonymous } from '../../config/firebase';
import { Box, Divider, Button } from '@mui/material';

import { FacebookLoginButton, GoogleLoginButton, GithubLoginButton } from 'react-social-login-buttons';
import { signInWithGoogle } from '../../config/firebase';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [skip, setSkip] = useState(true);
    // console.log('🚀 ~ file: Login.jsx:17 ~ Login ~ skip', skip);
    const { data, isSuccess, isError, isLoading, error, isUninitialized } = useLoginQuery(undefined, { skip });
    // const auth = getAuth();

    const storeUserInState = (authUser) => {
        return dispatch(
            setCredentials({
                email: authUser.email,
                firstName: authUser.displayName?.split(' ')[0],
                lastName: authUser.displayName?.split(' ')[1],
                photoUrl: authUser.photoURL
                    ? authUser.photoURL
                    : authUser.isAnonymous
                    ? 'https://winaero.com/blog/wp-content/uploads/2019/09/Chrome-Incognito-Mode-Icon-256.png'
                    : null,
                uid: authUser.uid,
                firebaseIdToken: authUser.accessToken,
                isAnonymous: authUser.isAnonymous, // anonymous login
            })
        );
    };
    // Auto-login and redirect to /all if user was logged in last time
    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             // User is signed in, see docs for a list of available properties
    //             // https://firebase.google.com/docs/reference/js/firebase.User
    //             console.log('Has currentUser!!', user);
    //             storeUserInState(user);
    //             // navigate('/all');
    //         } else {
    //             console.log(`No current User!!`);
    //             // User is signed out
    //             // ...
    //         }
    //     });
    // }, []);
    useEffect(() => {
        if (isSuccess) {
            console.log('Success! data:', data);
            navigate('/all');
        }
    }, [isSuccess]);

    const onClickSignInAnonymous = async (e) => {
        e.preventDefault();
        const authUser = await signInAnonymous();
        // console.log('🚀 ~ file: Login.jsx:63 ~ onClickSignInAnonymous ~ authUser', authUser);
        if (authUser) {
            storeUserInState(authUser);
            setSkip((prev) => !prev);
            // navigate('/all');
        }
    };
    const onClickGoogle = async (e) => {
        e.preventDefault();
        const authUser = await signInWithGoogle();
        if (authUser) {
            storeUserInState(authUser);
            setSkip((prev) => !prev);
            // navigate('/all');
        }
    };
    const onClickLogin = () => {
        alert('Working in progress');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'secondary.light',
                height: '100%',
                width: '100%',
                position: 'fixed',
            }}
        >
            <div style={{ color: 'black', marginBottom: '10px' }}>
                {isError ? (
                    <>Oh no, there was an error {error}</>
                ) : isUninitialized ? (
                    <div>Currently skipped</div>
                ) : isLoading ? (
                    <>loading...</>
                ) : data ? (
                    <div>{data.msg}</div>
                ) : null}
            </div>
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
                    <GoogleLoginButton onClick={onClickGoogle} />
                    <GithubLoginButton onClick={onClickLogin} />
                    <FacebookLoginButton onClick={onClickLogin} />
                </div>
            </Box>
        </Box>
    );
};
export default Login;
