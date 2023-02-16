import Todo from './Todo';
import CompletedTodoPanel from './CompletedTodoPanel';
import { Collapse, Fade, Divider } from '@mui/material';
import { useState } from 'react';
import { TransitionGroup } from 'react-transition-group';

export default function TodoList({ todos }) {
    const [isCompletedPanelOpen, setIsCompletedPanelOpen] = useState(true);

    let openedTodos = [];
    let completedTodos = [];

    todos?.forEach((todo) => {
        if (!todo.completed) {
            openedTodos.push(
                // <Collapse
                //     in={true}
                //     key={todo._id}
                //     timeout={{ enter: 100, exit: 100 }}
                //     unmountOnExit
                //     // easing={{
                //     //     enter: 'cubic-bezier(0,-1.55,.61,1.58)',
                //     //     exit: 'cubic-bezier(0,-1.55,.61,1.58)',
                //     // }}
                // >
                //     <Todo key={todo._id} todoId={todo._id} />
                // </Collapse>
                <Todo key={todo._id} todoId={todo._id} />
            );
        } else if (todo.completed) {
            completedTodos.push(
                <Collapse timeout={{ enter: 300, exit: 300 }} key={todo._id} unmountOnExit>
                    {<Todo key={todo._id} todoId={todo._id} />}
                </Collapse>
                // <Todo key={todo._id} todoId={todo._id} />
            );
        }
    });

    return (
        <>
            {/* <TransitionGroup>{openedTodos}</TransitionGroup> */}
            {openedTodos}
            {completedTodos.length !== 0 ? (
                <CompletedTodoPanel {...{ isCompletedPanelOpen, setIsCompletedPanelOpen }} />
            ) : null}
            {isCompletedPanelOpen ? (
                <Collapse
                    in={isCompletedPanelOpen}
                    timeout={{ enter: 500, exit: 100 }}
                    easing={{
                        enter: 'cubic-bezier(0, 1.5, .8, 1)',
                        exit: 'cubic-bezier(0, 1.5, .8, 1)',
                    }}
                >
                    <TransitionGroup>{completedTodos}</TransitionGroup>
                    {/* {completedTodos} */}
                </Collapse>
            ) : (
                <Divider />
            )}
        </>
    );
}
