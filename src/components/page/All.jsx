import { useGetTodosQuery } from '../../features/todo/todosApiSlice';
import TodoList from '../../features/todo/TodoList';
import { useNavigate } from 'react-router-dom';

const All = () => {
    const { data, isError, isLoading, error } = useGetTodosQuery('todosList');
    const todos = data?.ids.map((id) => data?.entities[id]);
    const navigate = useNavigate();
    console.log('🚀 ~ file: All.jsx:7 ~ All ~ todos', todos);

    if (isLoading) {
        return <p>Loading</p>;
    }
    if (isError && error.status === 404) {
        return <p>No Content</p>;
    }
    return (
        <div>
            <button onClick={() => navigate('/priority')}>to priority</button>
            <TodoList todos={todos} />
        </div>
    );
};
export default All;
