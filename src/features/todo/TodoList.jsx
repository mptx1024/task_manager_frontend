import { useGetTodosQuery } from './todosApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import { useEffect, useRef } from 'react';
import { Counter } from '../../config/Counter';
import TodoItem from './TodoItem';
import CompletedTodoList from './CompletedTodoList';

import { Collapse, List, Fade } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

export default function TodoList() {
    const { data, isError, isLoading, error } = useGetTodosQuery('todosList');
    // console.log(`data: ${JSON.stringify(data)}`);
    // console.log(`data.ids: ${data?.ids}; typeof data.ids: ${typeof data?.ids}; length:${data?.ids.length}`);
    const todos = data?.ids.map((id) => data?.entities[id]);

    if (isLoading) {
        return <p>Loading</p>;
    }
    if (isError && error.status === 404) {
        return <p>No Content</p>;
    }

    let openedTodos = [];
    let completedTodos = [];

    todos?.forEach((todo) => {
        if (!todo.completed) {
            openedTodos.push(
                <Collapse
                    key={todo._id}
                    timeout={{ enter: 250, exit: 100 }}
                    unmountOnExit
                    easing={{ enter: 'cubic-bezier(0,-1.55,.61,1.58)', exit: 'linear' }}
                >
                    {<TodoItem key={todo._id} todoId={todo._id} />}
                </Collapse>
            );
        } else if (todo.completed) {
            completedTodos.push(
                <Collapse timeout={250} key={todo._id} unmountOnExit>
                    {<TodoItem key={todo._id} todoId={todo._id} />}
                </Collapse>
            );
        }
    });

    return (
        <>
            <List>
                <TransitionGroup>{openedTodos}</TransitionGroup>
            </List>
            <CompletedTodoList
                content={
                    <List>
                        <TransitionGroup>{completedTodos}</TransitionGroup>
                    </List>
                }
            />
        </>
    );
}
