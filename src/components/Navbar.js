import { signOutGoogle } from '../config/firebase';
import { logout } from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../features/theme/themeSlice';
import { selectCurrentUser } from '../features/auth/authSlice';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import LoginButton from './LoginButton';

import { Menu } from '@mui/icons-material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { AppBar, Box, Button, IconButton, styled, Toolbar, Typography } from '@mui/material';

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
});

const Navbar = () => {
    const dispatch = useDispatch();
    const userInState = useSelector(selectCurrentUser); // The user in redux state
    const authUser = useFirebaseAuth();
    const themeState = useSelector((state) => state.theme.theme);

    const onClickSignOut = () => {
        signOutGoogle();
        dispatch(logout());
    };
    const onClickToggleMode = () => {
        dispatch(toggleTheme());
    };
    return (
        <AppBar position='fixed'>
            <StyledToolbar>
                <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
                    <Menu />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 2 }}>
                    Todo React & Redux Toolkit
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={onClickToggleMode}>
                        {themeState === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Box>

                <Box>
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
    );
};
export default Navbar;
