import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toggleSideBar } from '../features/visual/sideBarSlice';

import { Drawer, Typography, Box } from '@mui/material';

const Sidebar = () => {
    // const theme = useTheme();
    const drawerWidth = 240;
    const isSideBarOpen = useSelector((state) => state.sideBar.sideBar);

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                zIndex: 1,
            }}
            variant='persistent'
            anchor='left'
            open={isSideBarOpen}
        >
            <p>test</p>
        </Drawer>
    );
};

export default Sidebar;
