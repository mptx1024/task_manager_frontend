import { Box, Typography, CircularProgress } from '@mui/material';

const CircularLoader = ({ message }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant='body1' sx={{ color: 'secondary.dark', mr: '0.5rem' }}>
                {message}
            </Typography>
            <CircularProgress color='secondary' size='1rem' />
        </Box>
    );
};
export default CircularLoader;
