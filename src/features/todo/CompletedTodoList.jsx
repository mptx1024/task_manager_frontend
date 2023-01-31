import { useState } from 'react';

import { Collapse, List, Typography, Box, IconButton, Divider } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { TransitionGroup } from 'react-transition-group';

const CompletedTodoList = ({ content }) => {
    const [isCompletedPanelOpen, setIsCompletedPanelOpen] = useState(false);
    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', my: '1rem' }}>
                <IconButton
                    size='small'
                    onClick={() => setIsCompletedPanelOpen((prev) => !prev)}
                    sx={{ transform: isCompletedPanelOpen && 'rotate(90deg)', mr: 2 }}
                >
                    <ArrowForwardIosIcon fontSize='small' />
                </IconButton>
                <Typography variant='inherit'>Completed</Typography>
            </Box>
            {isCompletedPanelOpen ? (
                <Collapse
                    in={isCompletedPanelOpen}
                    timeout={{ enter: 500, exit: 100 }}
                    easing={{
                        enter: 'cubic-bezier(0, 1.5, .8, 1)',
                        exit: 'cubic-bezier(0, 1.5, .8, 1)',
                    }}
                >
                    {content}
                </Collapse>
            ) : (
                <Divider />
            )}
        </Box>
    );
};
export default CompletedTodoList;
