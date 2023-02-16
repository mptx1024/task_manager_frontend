import { drawerWidth } from '../config/UiParams';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import AddTodo from '../features/todo/AddTodo';
import SideBar from './nav/Sidebar/Sidebar';
import Navbar from './nav/Navbar';
import DataFetchingBackdrop from './Backdrop';
import { useGetTodosQuery } from '../features/todo/todosApiSlice';
import { useUpsertTodoCache } from './page/useUpsertTodoCache';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledStack = styled(Stack, {
    shouldForwardProp: (prop) => prop !== 'isSideBarOpen',
})(({ theme, isSideBarOpen }) => ({
    flexGrow: 1,
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),

    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(isSideBarOpen && {
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const BodyLayout = () => {
    const isSideBarOpen = useSelector((state) => state.sideBar.sideBar);

    const { data: todos, isLoading, isSuccess } = useGetTodosQuery('todosList');
    // console.log('🚀 ~ file: BodyLayout.jsx:37 ~ BodyLayout ~ todos', todos, isSuccess);

    const { isUpsertingCache } = useUpsertTodoCache(todos);

    // In case no todo is returned
    if ((isUpsertingCache || isLoading) && !isSuccess) {
        return <DataFetchingBackdrop />;
    }
    return (
        <>
            <Navbar />
            <SideBar />
            <StyledStack isSideBarOpen={isSideBarOpen}>
                <AddTodo />
                <Outlet />
            </StyledStack>
        </>
    );
    // return (
    //     <>
    //         {!isUpserting ? (
    //             <>
    //                 <Navbar />
    //                 <SideBar />
    //                 <StyledStack isSideBarOpen={isSideBarOpen}>
    //                     <AddTodo />
    //                     <Outlet />
    //                 </StyledStack>
    //             </>
    //         ) : (
    //             <p>Retrieving data...</p>
    //         )}
    //     </>
    // );
};
export default BodyLayout;
