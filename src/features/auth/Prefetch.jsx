import { store } from '../../app/store';
import { projectsApiSlice } from '../project/ProjectsApiSlice';
import { todosApiSlice } from '../todo/todosApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './authSlice';
import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';

import { useGetTodosQuery } from '../todo/todosApiSlice';
import { useGetProjectsQuery } from '../project/ProjectsApiSlice';

const Prefetch = () => {
    const userInState = useSelector((state) => state.auth.user);

    // https://redux-toolkit.js.org/rtk-query/api/created-api/api-slice-utils#prefetch

    useEffect(() => {
        console.log(`Prefeching.. `);
        store.dispatch(projectsApiSlice.util.prefetch('getProjects', 'projectsList', { force: true }));
        store.dispatch(todosApiSlice.util.prefetch('getTodos', 'todosList', { force: true }));
    }, [userInState]);

    return <Outlet />;
};
export default Prefetch;
