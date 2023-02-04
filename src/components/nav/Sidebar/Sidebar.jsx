import { useSelector, useDispatch } from 'react-redux';
import { toggleSideBar } from '../../../features/visual/sideBarSlice';
import ProjectList from '../../../features/project/ProjectList';
import Categories from './Categories';
import { drawerWidth } from '../../../config/UiParams';
import { ChevronLeft } from '@mui/icons-material';


import {
    Drawer,
    IconButton,
    Divider,
    styled,
} from '@mui/material';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end', // for anchoring sidebar arrow button
    height: '3rem',
    padding: theme.spacing(0, 1),
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
                // flexShrink: 2,
                // '& .MuiDrawer-paper': {
                //     width: drawerWidth,
                //     boxSizing: 'border-box',
                // },
                // zIndex: 1,
            }}
            variant='persistent'
            anchor='left'
            open={isSideBarOpen}
        >
            <DrawerHeader>
                <IconButton onClick={onClickCloseSideBar}>
                    <ChevronLeft />
                </IconButton>
            </DrawerHeader>
            <Divider variant='middle' />
            <Categories />

            <Divider variant='middle' />
            <ProjectList />
            {/* {isUserInState ? <ProjectList /> : <p>no project yet</p>} */}
        </Drawer>
    );
};

export default SideBar;
