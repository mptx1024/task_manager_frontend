import Todo from './Todo';
import CompletedTodoList from './CompletedTodoList';
import { Collapse, List } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { useGetTodosQuery } from './todosApiSlice';

export default function TodoList({ todos }) {
    // console.log('🚀 ~ file: TodoList.jsx:9 ~ TodoList ~ todos', todos);
    // const { data: todos, isError, isSuccess, isLoading, error } = useGetTodosQuery('todosList');

    let openedTodos = [];
    let completedTodos = [];

    todos?.forEach((todo) => {
        if (!todo.completed) {
            openedTodos.push(
                // <Collapse
                //     key={todo._id}
                //     timeout={{ enter: 100, exit: 100 }}
                //     unmountOnExit
                //     easing={{ enter: 'cubic-bezier(0,-1.55,.61,1.58)', exit: 'linear' }}
                // >
                // {<Todo key={todo._id} todoId={todo._id} />}
                // </Collapse>
                <Todo key={todo._id} todoId={todo._id} />
            );
        }
        // else if (todo.completed) {
        //     completedTodos.push(
        //         <Collapse
        //             timeout={{ enter: 250, exit: 100 }}
        //             key={todo._id}
        //             // unmountOnExit
        //         >
        //             {<Todo key={todo._id} todoId={todo._id} />}
        //         </Collapse>
        //     );
        // }
    });
    // console.log('🚀 ~ file: TodoList.jsx:11 ~ TodoList ~ completedTodos', completedTodos);

    return (
        <>
            <List>
                {/* <TransitionGroup> */}
                {openedTodos}
                {/* </TransitionGroup> */}
            </List>
            {completedTodos.length !== 0 ? <CompletedTodoList content={completedTodos} /> : null}
        </>
    );
}
