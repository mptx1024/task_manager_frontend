import { drawerWidth } from '../config/UiParams';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import AddTodo from '../features/todo/AddTodo';
import SideBar from './nav/Sidebar/Sidebar';
import Navbar from './nav/Navbar';

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
    // justifyContent: 'center',
    // border: '1px solid red',
    // marginLeft: `-${drawerWidth}px`,
    // marginRight: `5px`,
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
    // const [isUpserting, setIsUpserting] = useState(true);

    const { data: todos } = useGetTodosQuery('todosList');

    const { isUpserting } = useUpsertTodoCache(todos);

    return (
        <>
            {!isUpserting ? (
                <>
                    <Navbar />
                    <SideBar />
                    <StyledStack isSideBarOpen={isSideBarOpen}>
                        <AddTodo />
                        <Outlet />
                    </StyledStack>
                </>
            ) : (
                <p>Retrieving data...</p>
            )}
        </>
    );
};
export default BodyLayout;
