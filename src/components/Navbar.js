import { Menu } from '@mui/icons-material';
import { AppBar, Box, Button, IconButton, styled, Toolbar, Typography } from '@mui/material';
import { signInWithGoogle, signOutGoogle, signInAnonymous } from '../config/firebase';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import { signOut } from 'firebase/auth';
const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    // overflow: 'clip',
});

const Navbar = () => {
    const dispatch = useDispatch();
    const userInState = useSelector(selectCurrentUser); // The user in redux state
    // console.log('🚀 ~ file: Navbar.js:16 ~ Navbar ~ userInState', userInState);
    // const authUser = auth.currentUser;
    const authUser = useFirebaseAuth();
    // console.log('🚀 ~ file: Navbar.js:19 ~ Navbar ~ authUser', typeof authUser, authUser);

    // if (!authUser) {
    //     console.log('test');
    //     signInAnonymous();
    // }

    const onClickSignOut = () => {
        signOutGoogle();
        dispatch(logout());
    };

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
                    {userInState?.isAnonymous ? (
                        <Button color='inherit' onClick={signInWithGoogle}>
                            Login
                        </Button>
                    ) : (
                        <>
                            <img
                                src={userInState?.photoUrl}
                                alt=''
                                referrerPolicy='no-referrer'
                                width={25}
                                height={25}
                            />
                            <p>{userInState?.displayName}</p>
                            <Button color='inherit' onClick={onClickSignOut}>
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
