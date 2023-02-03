import TodoList from '../features/todo/TodoList';
import CompletedTodoList from '../features/todo/CompletedTodoList';
import { drawerWidth } from '../config/UiParams';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import AddTodo from '../features/todo/AddTodo';

import { Stack, styled, Box } from '@mui/material';
import SideBar from './nav/Sidebar';

const StyledStack = styled(Stack, {
    shouldForwardProp: (prop) => prop !== 'isSideBarOpen',
})(({ theme, isSideBarOpen }) => ({
    flexGrow: 1,
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    height: '95vh',
    maxHeight: '95vh',
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    border: '1px solid red',
    marginLeft: `-${drawerWidth}px`,
    // marginRight: `5px`,
    ...(isSideBarOpen && {
        // width: `calc(100% - ${drawerWidth}px)`,
        // marginLeft: `${drawerWidth}px`,
        marginLeft: `0px`,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const BodyLayout = () => {
    const isSideBarOpen = useSelector((state) => state.sideBar.sideBar);
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <SideBar />
                <StyledStack isSideBarOpen={isSideBarOpen}>
                    <AddTodo />
                    <Outlet />
                </StyledStack>
            </Box>
        </>
    );
};
export default BodyLayout;