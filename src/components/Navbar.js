import { Menu } from '@mui/icons-material';
import { AppBar, Box, Button, IconButton, styled, Toolbar, Typography } from '@mui/material';
import { signInWithGoogle, signOutGoogle } from '../config/firebase';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectCurrentUser } from '../features/auth/authSlice';

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    // overflow: 'clip',
});

const Navbar = () => {
    const dispatch = useDispatch();
    const userInState = useSelector(selectCurrentUser); // The use in redux state

    useEffect(() => {
        // https://firebase.google.com/docs/reference/js/auth.auth#authonauthstatechanged
        // The onAuthStateChanged() function actually returns a function that you can call to unsubscribe

        const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
            // The user obj from firebase
            if (user) {
                // User is signed in
                console.log('in useEffect-> user is signed in');
                // https://firebase.google.com/docs/reference/js/v8/firebase.User#getidtoken
                const idToken = await user.getIdToken({ forceRefresh: true });
                // console.log(`idToken: ${idToken}`);
                dispatch(
                    login({
                        email: user.email,
                        uid: user.uid,
                        displayName: user.displayName,
                        photoUrl: user.photoURL,
                        firebaseIdToken: idToken,
                    })
                );
            } else {
                console.log(
                    'in useEffect-> state has no user, meaning user has logged out. dispatching logout() to clear state'
                );
                dispatch(logout());
            }
        });
        return unsubscribe(); // clean up function. unsubscribing from the listener when the component is unmounting
        // eslint-disable-next-line
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='fixed'>
                <StyledToolbar>
                    <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
                        <Menu />
                    </IconButton>
                    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                        Todo React & Redux Toolkit
                    </Typography>
                    {!userInState ? (
                        <Button color='inherit' onClick={signInWithGoogle}>
                            Login
                        </Button>
                    ) : (
                        <>
                            <img
                                src={userInState.photoUrl}
                                alt=''
                                referrerPolicy='no-referrer'
                                width={25}
                                height={25}
                            />
                            <p>{userInState.displayName}</p>
                            <Button color='inherit' onClick={signOutGoogle}>
                                Logout
                            </Button>
                        </>
                    )}
                </StyledToolbar>
            </AppBar>
        </Box>
    );
};
export default Navbar;
