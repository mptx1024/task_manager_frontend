import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';

import { TransitionGroup } from 'react-transition-group';
import { useGetTodosQuery } from './todosSlice';
import TodoItem from './TodoItem';

export default function TodoList(props) {
    const { data: todos, isLoading, isSuccess, isError, error } = useGetTodosQuery('getTodos');
    // console.log('in todoList, iscompletedPanel:', props.isCompletePanel);
    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
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
        content = <p>{error}</p>;
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
