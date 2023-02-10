import { useSelector, useDispatch } from 'react-redux';
import { toggleSideBar } from '../../../features/util/sideBarSlice';
import ProjectList from '../../../features/project/ProjectList';
import Categories from './Categories';
import { drawerWidth } from '../../../config/UiParams';

import { ChevronLeftIcon } from '../../asset/svgIcons';
import { Drawer, IconButton, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end', // for anchoring sidebar arrow button
    height: '3rem',
    padding: theme.spacing(0, 1),
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.grey[900],
}));

const SideBar = () => {
    const isSideBarOpen = useSelector((state) => state.sideBar.sideBar);
    const dispatch = useDispatch();

    const onClickCloseSideBar = () => {
        dispatch(toggleSideBar());
    };

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 2,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    // boxSizing: 'border-box',
                },
            }}
            variant='persistent'
            anchor='left'
            open={isSideBarOpen}
        >
            <DrawerHeader>
                <IconButton onClick={onClickCloseSideBar}>
                    <ChevronLeftIcon htmlColor='white' />
                </IconButton>
            </DrawerHeader>
            <Categories />
            <Divider variant='middle' />
            <ProjectList />
        </Drawer>
    );
};

export default SideBar;
