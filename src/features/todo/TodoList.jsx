import Todo from './Todo';
import CompletedTodoPanel from './CompletedTodoPanel';
import { Collapse, Divider } from '@mui/material';
import { useState } from 'react';
import { TransitionGroup } from 'react-transition-group';

export default function TodoList({ todos }) {
    const [isCompletedPanelOpen, setIsCompletedPanelOpen] = useState(true);

    let openedTodos = [];
    let completedTodos = [];

    todos?.forEach((todo) => {
        if (!todo.completed) {
            openedTodos.push(<Todo key={todo._id} todoId={todo._id} />);
        } else if (todo.completed) {
            completedTodos.push(
                <Collapse timeout={{ enter: 300, exit: 300 }} key={todo._id} unmountOnExit>
                    {<Todo key={todo._id} todoId={todo._id} />}
                </Collapse>
            );
        }
    });

    return (
        <div id='todo_list' style={{ display: 'flex', flexDirection: 'column', marginBottom: '2rem' }}>
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
                </Collapse>
            ) : (
                <Divider />
            )}
        </div>
    );
}
