import { Menu } from '@mui/icons-material';
import { AppBar, Box, Container, Button, IconButton, styled, Toolbar, Typography } from '@mui/material';
import { signOutGoogle } from '../config/firebase';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import LoginButton from './LoginButton';

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
});

const Navbar = () => {
    const dispatch = useDispatch();
    const userInState = useSelector(selectCurrentUser); // The user in redux state
    // console.log('🚀 ~ file: Navbar.js:16 ~ Navbar ~ userInState', userInState);
    // const authUser = auth.currentUser;
    const authUser = useFirebaseAuth();
    // console.log('🚀 ~ file: Navbar.js:19 ~ Navbar ~ authUser', typeof authUser, authUser);

    const onClickSignOut = () => {
        signOutGoogle();
        dispatch(logout());
    };

    return (
        <Box>
            <AppBar position='fixed'>
                <StyledToolbar>
                    <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
                        <Menu />
                    </IconButton>
                    <Typography variant='h6' component='div' sx={{ flexGrow: 2 }}>
                        Todo React & Redux Toolkit
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        {userInState?.isAnonymous || !userInState ? (
                            <LoginButton />
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box
                                    component='img'
                                    src={userInState?.photoUrl}
                                    alt=''
                                    sx={{ borderRadius: '50%', height: 25, width: 25, mr: 0.7 }}
                                />
                                <Typography sx={{ mr: 2 }}>{userInState?.displayName}</Typography>
                                <Button color='inherit' onClick={onClickSignOut}>
                                    Logout
                                </Button>
                            </Box>
                        )}
                    </Box>
                </StyledToolbar>
            </AppBar>
        </Box>
    );
};
export default Navbar;
