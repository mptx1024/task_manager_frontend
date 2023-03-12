import PageTitle from './PageTitle';
import { useGetTodosQuery } from '../../features/todo/todosApiSlice';
import TodoList from '../../features/todo/TodoList';

const All = () => {
    const {
        data: todos,
        isError,
        isLoading,
        error,
    } = useGetTodosQuery(
        'todosList'
        //  { refetchOnMountOrArgChange: true }
    );
    if (isLoading) {
        return <p>Loading...</p>;
    } else if (isError) {
        return <p>{error.message}</p>;
    } else if (!todos) {
        return <p>No tasks</p>;
    }
    // else if (!isUpserting) {
    return (
        <div>
            <PageTitle title={'All'} />
            <TodoList todos={todos} />
        </div>
    );
    // }
};
export default All;
