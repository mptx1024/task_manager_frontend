import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../features/visual/themeSlice';
import { toggleSideBar } from '../../features/visual/sideBarSlice';
import { selectCurrentUser } from '../../features/auth/authSlice';
// import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import LoginUserBox from '../user/LoginUserBox';
import LoginButton from './LoginButton';

// import { useEffect } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../../config/firebase';
// import { login, logout } from '../../features/auth/authSlice';
// import { signInAnonymous } from '../../config/firebase';

import { Menu } from '@mui/icons-material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { AppBar, Box, IconButton, styled, Toolbar, Typography } from '@mui/material';

const drawerWidth = 240;

const StyledAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'isSideBarOpen',
})(
    //
    ({ theme, isSideBarOpen }) => ({
        height: '3rem',
        justifyContent: 'center',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(isSideBarOpen && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    })
);

const Navbar = () => {
    const dispatch = useDispatch();
    const userInState = useSelector(selectCurrentUser);
    const themeState = useSelector((state) => state.theme.theme);
    const isSideBarOpen = useSelector((state) => state.sideBar.sideBar);

    const onClickToggleMode = () => {
        dispatch(toggleTheme());
    };
    const onClickToggleSideBar = () => {
        dispatch(toggleSideBar());
    };
    return (
        <StyledAppBar position='fixed' isSideBarOpen={isSideBarOpen}>
            <Toolbar>
                {isSideBarOpen ? null : (
                    <IconButton
                        onClick={onClickToggleSideBar}
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        sx={{ mr: 2 }}
                    >
                        <Menu />
                    </IconButton>
                )}
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
                        <LoginUserBox userInState={userInState} />
                    )}
                </Box>
            </Toolbar>
        </StyledAppBar>
    );
};
export default Navbar;
