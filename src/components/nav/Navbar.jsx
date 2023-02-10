import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../features/util/themeSlice';
import { toggleSideBar } from '../../features/util/sideBarSlice';
import { selectCurrentUser } from '../../features/auth/authSlice';
import LoginUserBox from '../user/LoginUserBox';
import LoginButton from './LoginButton';

import { MenuIcon, Brightness4Icon, Brightness7Icon } from '../asset/svgIcons';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const StyledAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'isSideBarOpen',
})(({ theme, isSideBarOpen }) => ({
    height: '3rem',
    justifyContent: 'center',
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.grey[900],
    backgroundImage: 'none',

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
}));

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
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon fontSize='medium' />
                    </IconButton>
                )}
                <Typography variant='h6' sx={{ flexGrow: 2, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    Task Manager
                </Typography>

                <Box sx={{ mr: '0.5rem' }}>
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
