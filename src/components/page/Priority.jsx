import { useGetTodosQuery } from '../../features/todo/todosApiSlice';
import TodoList from '../../features/todo/TodoList';
import PageTitle from './PageTitle';
const Priority = () => {
    const { todos, isLoading } = useGetTodosQuery('todosList', {
        selectFromResult: ({ data }) => ({
            todos: data?.filter((todo) => todo.priority === true),
        }),
    });

    return (
        <div>
            <PageTitle title={'Priority'} />
            {isLoading ? <p>Loading..</p> : todos?.length === 0 ? <p>No Task</p> : <TodoList todos={todos} />}
        </div>
    );
};
export default Priority;
