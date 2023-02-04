import { store } from '../../app/store';
import { projectsApiSlice } from '../project/ProjectsApiSlice';
import { todosApiSlice } from '../todo/todosApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';

// import { useGetTodosQuery } from '../todo/todosApiSlice';
// import { useGetProjectsQuery } from '../project/ProjectsApiSlice';

const Prefetch = () => {
    const userInState = useSelector((state) => state.auth.user);
    const state = useSelector((state) => state);

    const navigate = useNavigate();
    // https://redux-toolkit.js.org/rtk-query/api/created-api/api-slice-utils#prefetch
    // let returnedTodos;

    useEffect(() => {
        if (userInState) {
            console.log(`Prefeching.. userInstate? ${Boolean(userInState)}`);
            store.dispatch(projectsApiSlice.util.prefetch('getProjects', 'projectsList', { force: true }));
            store.dispatch(todosApiSlice.util.prefetch('getTodos', 'todosList', { force: true }));
        }
    }, [userInState]);
    // Once the subscriptions are established, render the protected part
    if (Object.keys(state.api.subscriptions).length !== 0) {
        return <Outlet />;
    }

    // console.log(`user NOT in state`);
    return <p>prefetching</p>;
};
export default Prefetch;
