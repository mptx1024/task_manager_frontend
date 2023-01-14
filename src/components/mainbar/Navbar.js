import { Menu } from '@mui/icons-material';
import { AppBar, Box, Button, IconButton, styled, Toolbar, Typography } from '@mui/material';
import { signInWithGoogle, signOutGoogle } from '../../config/firebase';

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    // overflow: 'clip',
});

const Navbar = () => {
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
                    <Button color='inherit' onClick={signInWithGoogle}>
                        Login
                    </Button>
                    <Button color='inherit' onClick={signOutGoogle}>
                        Logout
                    </Button>
                </StyledToolbar>
            </AppBar>
        </Box>
    );
};
export default Navbar;
