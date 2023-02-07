import { useGetTodosQuery } from '../../features/todo/todosApiSlice';
import TodoList from '../../features/todo/TodoList';

const Today = () => {
    const { todos, isError, isLoading, error } = useGetTodosQuery('todosList', {
        selectFromResult: ({ data }) => ({
            todos: data?.ids
                .map((id) => data?.entities[id])
                .filter((todo) => new Date(todo.dueDate).getDay() === new Date().getDay()),
        }),
    });

    if (isLoading) {
        return <p>Loading</p>;
    }
    if (isError && error.status === 404) {
        return <p>No Content</p>;
    }
    return <TodoList todos={todos} />;
};
export default Today;
