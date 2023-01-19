import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';

import { TransitionGroup } from 'react-transition-group';
import { useGetTodosQuery, useLazyGetTodosQuery } from './todosApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import { useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import TodoItem from './TodoItem';

export default function TodoList(props) {
    // Use refetch():
    // const { data: todos, refetch, isLoading, isSuccess, isError, error } = useGetTodosQuery();
    // const userInState = useSelector(selectCurrentUser); // The user in redux state
    // useEffect(() => {
    //     console.log('🚀 ~ file: TodoList.js:18 ~ TodoList ~ userInState', userInState);

    //     refetch();
    // }, [userInState, refetch]);

    // Use lazyQuery:
    const userInState = useSelector(selectCurrentUser); // The user in redux state

    const [trigger, { data: todos, isLoading, isSuccess, isError, error }] = useLazyGetTodosQuery();

    const isFirstRun = useRef(true); // Used to prevent useEffect's first rending
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        trigger();
    }, [userInState]);

    let content;

    if (isLoading) {
        // console.log(`isLoading: ${isLoading}`);
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        // console.log(`isSuccess: ${isSuccess}`);
        const renderedTodos = todos?.ids.map((id) => {
            const todo = todos.entities[id];
            if (!props.isCompletePanel) {
                if (!todo.isCompleted) return <Collapse key={id}> {<TodoItem todo={todo} />} </Collapse>;
            }
            // else {
            //     if (todo.isCompleted) return <Collapse key={id}> {<TodoItem todo={todo} />} </Collapse>;
            // }
            return <Collapse key={id}> {<TodoItem todo={todo} />} </Collapse>;
        });
        content = (
            <List>
                <TransitionGroup>{renderedTodos}</TransitionGroup>
            </List>
        );
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>;
    }

    return (
        <Box>
            <List>{content}</List>
        </Box>
    );
}
TodoList.defaultProps = {
    isCompletePanel: false,
};
