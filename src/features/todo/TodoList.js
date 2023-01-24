import { useLazyGetTodosQuery } from './todosApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import { useEffect, useRef } from 'react';
import TodoItem from './TodoItem';

import { Collapse, List, Box } from '@mui/material';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
export default function TodoList() {
    // Use refetch():
    // const { data: todos, refetch, isLoading, isSuccess, isError, error } = useGetTodosQuery();
    // const userInState = useSelector(selectCurrentUser); // The user in redux state
    // useEffect(() => {
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
        const { entities } = todos;
        let openedTodos = [];
        for (let [id, todo] of Object.entries(entities)) {
            if (!todo.completed) {
                openedTodos.push(
                    <Collapse timeout={500} key={id}>
                        {<TodoItem key={id} todo={todo} />}
                    </Collapse>
                );
            }
        }
        content = (
            <List>
                <TransitionGroup>{openedTodos}</TransitionGroup>
            </List>
        );
    } else if (isError) {
        // content = <p>{JSON.stringify(error)}</p>;
        // Expect:  {"status":400,"data":{"msg":"No todos found with uid PsijbkDmY0dELRHUJH8WQpl9UDjF"}}
        content = null;
    }
    return content;
}
