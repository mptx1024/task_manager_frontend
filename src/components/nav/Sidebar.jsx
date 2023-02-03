import { useSelector, useDispatch } from 'react-redux';
import { toggleSideBar } from '../../features/visual/sideBarSlice';
import ProjectList from '../../features/project/ProjectList';

import { drawerWidth } from '../../config/UiParams';

import { ChevronLeft } from '@mui/icons-material';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LightModeIcon from '@mui/icons-material/LightMode';

import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
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
    const isUserInState = useSelector((state) => Boolean(state.auth.user));
    console.log('🚀 ~ file: Sidebar.jsx:35 ~ SideBar ~ isUserInState', isUserInState);

    const dispatch = useDispatch();

    const onClickCloseSideBar = () => {
        dispatch(toggleSideBar());
    };

    const getIcon = (text) => {
        if (text === 'All') {
            return <AllInclusiveIcon />;
        } else if (text === 'Today') {
            return <StarBorderIcon />;
        } else if (text === 'Priority') {
            return <LightModeIcon />;
        }
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
            <List>
                {['All', 'Today', 'Priority'].map((text, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>{getIcon(text)}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider variant='middle' />
            <ProjectList />
            {/* {isUserInState ? <ProjectList /> : <p>no project yet</p>} */}
        </Drawer>
    );
};

export default SideBar;
