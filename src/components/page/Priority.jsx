import { useGetTodosQuery } from '../../features/todo/todosApiSlice';
import TodoList from '../../features/todo/TodoList';

const Priority = () => {
    const { todos, isError, isLoading, error } = useGetTodosQuery('todosList', {
        selectFromResult: ({ data }) => ({
            todo: data?.ids.map((id) => data?.entities[id]).filter((todo) => todo.priority === true),
        }),
    });
    console.log('🚀 ~ file: Priority.jsx:10 ~ Priority ~ todos', todos);
    // const todos = data?.ids.map((id) => data?.entities[id]);

    if (isLoading) {
        return <p>Loading</p>;
    }
    if (isError && error.status === 404) {
        return <p>No Content</p>;
    }
    return (
        <div>
            <TodoList todos={todos} />
        </div>
    );
};
export default Priority;
