import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from './authSlice';
import { useLazyLoginQuery } from './authApiSlice';
import { signInAnonymous } from '../../config/firebase';
import { signInWithGoogle } from '../../config/firebase';
import CircularLoader from '../../components/CircularLoader';

import { Box, Divider, Button } from '@mui/material';
import { FacebookLoginButton, GoogleLoginButton, GithubLoginButton } from 'react-social-login-buttons';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [trigger, { data, isSuccess, isLoading, isError, error }] = useLazyLoginQuery();
    // let isLoading = true;
    const storeUserInState = (authUser) => {
        dispatch(
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

    useEffect(() => {
        if (isSuccess) {
            navigate('/all');
        }
    }, [isSuccess, data]);

    const onClickSignInAnonymous = async () => {
        const authUser = await signInAnonymous();
        if (authUser) {
            storeUserInState(authUser);
            await trigger();
        }
    };
    const onClickGoogle = async () => {
        const authUser = await signInWithGoogle();
        if (authUser) {
            storeUserInState(authUser);
            await trigger();
        }
    };
    const onClickGithub = async () => {};
    const onClickFB = async () => {};

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
                backgroundColor: 'background.paper',
                height: '100%',
                width: '100%',
                position: 'fixed',
            }}
        >
            <div style={{ color: 'black', marginBottom: '10px' }}>
                {isError ? (
                    <>Oh no, there was an error {error.message}</>
                ) : isLoading ? (
                    <CircularLoader {...{ message: 'Just a few seconds...' }} />
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
                <div>
                    <Divider light sx={{ color: 'grey.500', mx: '5px' }} spacing={1}>
                        Or
                    </Divider>
                </div>
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
