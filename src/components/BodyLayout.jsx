import { drawerWidth } from '../config/UiParams';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import AddTodo from '../features/todo/AddTodo';
import SideBar from './nav/Sidebar/Sidebar';
import Navbar from './nav/Navbar';
import Footer from './Footer';
import DataFetchingBackdrop from './Backdrop';
import { useGetTodosQuery } from '../features/todo/todosApiSlice';
import { useUpsertTodoCache } from './page/useUpsertTodoCache';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledStack = styled(Stack, {
    shouldForwardProp: (prop) => prop !== 'isSideBarOpen',
})(({ theme, isSideBarOpen }) => ({
    // flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '2rem 10%',
    marginTop: '3rem', // for starting after navbar
    height: '100vh',
    marginBottom: '0rem',

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
        [theme.breakpoints.down('sm')]: {
            visibility: 'hidden',
            // filter: 'brightness(10%)',
        },
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
            <StyledStack isSideBarOpen={isSideBarOpen} id='body_layout'>
                <AddTodo />
                <Outlet />
                <Footer />
            </StyledStack>
        </>
    );
};
export default BodyLayout;
