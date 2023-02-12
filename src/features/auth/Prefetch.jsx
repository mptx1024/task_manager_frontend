import { store } from '../../app/store';
import { projectsApiSlice } from '../project/ProjectsApiSlice';
import { todosApiSlice } from '../todo/todosApiSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { apiSlice } from '../../app/api/apiSlice';

const Prefetch = () => {
    const userInState = useSelector((state) => state.auth.user);
    const state = useSelector((state) => state);

    // https://redux-toolkit.js.org/rtk-query/api/created-api/api-slice-utils#prefetch
    // let returnedTodos;

    useEffect(() => {
        // if (userInState) {
        // store.dispatch(apiSlice.util.resetApiState());

        console.log(`Prefeching.. userInstate? ${Boolean(userInState)}`);
        store.dispatch(projectsApiSlice.util.prefetch('getProjects', 'projectsList', { force: false }));
        store.dispatch(todosApiSlice.util.prefetch('getTodos', 'todosList', { force: false }));
        // }
    }, []);
    // return <Outlet />;
    // Once the subscriptions are established, render the protected part
    if (Object.keys(state.api.subscriptions).length !== 0) {
        return <Outlet />;
    }

    // // // console.log(`user NOT in state`);
    else {
        return <p>prefetching...</p>;
    }
};
export default Prefetch;
