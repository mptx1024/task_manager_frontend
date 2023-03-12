import { useGetTodosQuery } from '../../features/todo/todosApiSlice';
import TodoList from '../../features/todo/TodoList';
import PageTitle from './PageTitle';
import { isOverdue } from '../../features/util/isOverdue';
const Overdue = () => {
    const { todos, isLoading } = useGetTodosQuery('todosList', {
        selectFromResult: ({ data }) => ({
            todos: data?.filter((todo) => todo.dueDate && isOverdue(new Date(todo.dueDate))),
        }),
    });

    return (
        <div>
            <PageTitle title={'Overdue'} />
            {isLoading ? <p>Loading..</p> : todos?.length === 0 ? <p>No Task</p> : <TodoList todos={todos} />}
        </div>
    );
};
export default Overdue;
