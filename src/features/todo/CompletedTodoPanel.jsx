import { ArrowForwardIosIcon } from '../../components/asset/svgIcons';
import { Typography, Box, IconButton } from '@mui/material';

const CompletedTodoPanel = ({ isCompletedPanelOpen, setIsCompletedPanelOpen }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: '1rem' }}>
            <IconButton
                size='small'
                onClick={() => setIsCompletedPanelOpen((prev) => !prev)}
                sx={{ transform: isCompletedPanelOpen && 'rotate(90deg)', mr: 2 }}
                disableRipple={true}
            >
                <ArrowForwardIosIcon sx={{ height: '18px', width: '18px' }} />
            </IconButton>
            <Typography variant='inherit'>Completed</Typography>
        </Box>
    );
};
export default CompletedTodoPanel;
