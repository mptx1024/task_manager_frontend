import { Menu } from '@mui/icons-material';
import { AppBar, Box, Button, IconButton, styled, Toolbar, Typography } from '@mui/material';
import { signInWithGoogle, signOutGoogle } from '../config/firebase';

import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectCurrentUser } from '../features/auth/authSlice';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    // overflow: 'clip',
});

const Navbar = () => {
    const userInState = useSelector(selectCurrentUser); // The user in redux state
    console.log('🚀 ~ file: Navbar.js:16 ~ Navbar ~ userInState', userInState);
    // const authUser = auth.currentUser;
    const authUser = useFirebaseAuth();
    console.log('🚀 ~ file: Navbar.js:19 ~ Navbar ~ authUser', typeof authUser, authUser);

    // dispatch(
    //     login({
    //         email: authUser.email,
    //         uid: authUser.uid,
    //         displayName: authUser.displayName,
    //         photoUrl: authUser.photoURL,
    //         firebaseIdToken: token,
    //     })
    // );
    // useEffect(() => {
    //     // https://firebase.google.com/docs/reference/js/auth.auth#authonauthstatechanged
    //     // The onAuthStateChanged() function actually returns a function that you can call to unsubscribe
    //     onAuthStateChanged(getAuth(), async (user) => {
    //         // The user obj from firebase
    //         console.log('onAuthStateChanged executed');
    //         if (user) {
    //             // User is signed in
    //             console.log('in useEffect-> user is signed in');
    //             // https://firebase.google.com/docs/reference/js/v8/firebase.User#getidtoken
    //             // @param: forceRefresh: true
    //             const firebaseIdToken = await user.getIdToken({});
    //             console.log('🚀 ~ file: Navbar.js:30 ~ onAuthStateChanged ~ firebaseIdToken', firebaseIdToken);
    //             dispatch(
    //                 login({
    //                     email: user.email,
    //                     uid: user.uid,
    //                     displayName: user.displayName,
    //                     photoUrl: user.photoURL,
    //                     firebaseIdToken,
    //                 })
    //             );
    //         } else {
    //             console.log(
    //                 'in useEffect-> state has no user, meaning user has logged out. dispatching logout() to clear state'
    //             );
    //             dispatch(logout());
    //         }
    //     });
    // return unsubscribe(); // clean up function. unsubscribing from the listener when the component is unmounting
    // eslint-disable-next-line
    // }, []);

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
