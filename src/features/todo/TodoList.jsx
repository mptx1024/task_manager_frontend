import { useGetTodosQuery } from './todosApiSlice';

import TodoItem from './TodoItem';
import CompletedTodoList from './CompletedTodoList';
import { Collapse, List } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

export default function TodoList({ todos }) {
    // console.log('🚀 ~ file: TodoList.jsx:9 ~ TodoList ~ todos', todos);
    // const { data, isError, isLoading, error } = useGetTodosQuery('todosList');
    // const todos = data?.ids.map((id) => data?.entities[id]);

    // if (isLoading) {
    //     return <p>Loading</p>;
    // }
    // if (isError && error.status === 404) {
    //     return <p>No Content</p>;
    // }

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
                <Collapse timeout={{ enter: 250, exit: 100 }} key={todo._id} unmountOnExit>
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
            <CompletedTodoList content={completedTodos} />
        </>
    );
}
