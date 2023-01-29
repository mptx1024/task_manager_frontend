import AddTodo from '../features/todo/AddTodo';
import TodoList from '../features/todo/TodoList';
import CompletedTodoList from '../features/todo/CompletedTodoList';
import { drawerWidth } from '../config/UiParams';
import sidebar from './nav/Sidebar';

import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { Stack, styled, Container, Box } from '@mui/material';
import SideBar from './nav/Sidebar';

const StyledStack = styled(Stack, {
    shouldForwardProp: (prop) => prop !== 'isSideBarOpen',
})(({ theme, isSideBarOpen }) => ({
    flexGrow: 1,
    border: '1px solid red',
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: `-${drawerWidth}px`,
    // marginRight: `5px`,
    ...(isSideBarOpen && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
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
            <SideBar />
            <Box sx={{ display: 'flex' }}>
                <StyledStack
                    isSideBarOpen={isSideBarOpen}
                    sx={{
                        // boxSizing: 'border-box',
                        height: '95vh',
                        maxHeight: '95vh',
                    }}
                >
                    <AddTodo />
                    <Outlet />
                </StyledStack>
            </Box>
        </>
    );
};
export default BodyLayout;
