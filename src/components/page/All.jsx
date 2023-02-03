import { useGetTodosQuery } from '../../features/todo/todosApiSlice';
import TodoList from '../../features/todo/TodoList';

const All = () => {
    const { data, isError, isLoading, error } = useGetTodosQuery('todosList');
    const todos = data?.ids.map((id) => data?.entities[id]);
    // console.log('🚀 ~ file: All.jsx:7 ~ All ~ todos', todos);
    console.log('All');
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
export default All;
