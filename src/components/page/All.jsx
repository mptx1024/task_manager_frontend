import TodoList from '../../features/todo/TodoList';
import CompletedTodoList from '../../features/todo/CompletedTodoList';

const All = () => {
    return (
        <div>
            <TodoList />
            <CompletedTodoList />
        </div>
    );
};
export default All;
