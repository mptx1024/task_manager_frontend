import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const todosAdapter = createEntityAdapter({
    /**
     selectId: A function that accepts a single Entity instance, and returns the value of whatever unique ID field is inside. If not provided, the default implementation is entity => entity.id. If your Entity type keeps its unique ID values in a field other than entity.id, you must provide a selectId function.
     */
    // _id() is a mongoose auto-generated field
    selectId: (todo) => todo._id,
    // Sort by date:
    // sortComparer: (a, b) => b.date.localeCompare(a.date)

    // Sort completed note to the bottom:
    // if a and b are both completed, don't change the sequence; if a is completed but b is not, return 1, which switch their order
    sortComparer: (a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1),
});
const initialState = todosAdapter.getInitialState();

export const extendedTodosSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTodos: builder.query({
            // GET
            query: () => ({
                url: '/todos',
                // https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery#handling-non-standard-response-status-codes
                validateStatus: (response, result) => response.status === 200 && !result.isError,
            }),
            transformResponse: (responseData) => {
                // console.log('🚀 ~ file: todosApiSlice.js:27 ~ responseData', responseData);
                // const loadedTodos = responseData.map((todo) => {
                //     todo.id = todo._id;
                // });

                return todosAdapter.setAll(initialState, responseData);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [{ type: 'Todo', id: 'LIST' }, ...result.ids.map((id) => ({ type: 'Todo', id }))];
                } else return [{ type: 'Todo', id: 'LIST' }];
            },
        }),

        // POST
        addTodos: builder.mutation({
            query: (initialTodo) => ({
                url: '/todos',
                method: 'POST',
                body: {
                    ...initialTodo, // Include UID, title, completed
                },
            }),
            invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
        }),
        // PATCH
        updateTodos: builder.mutation({
            query: (initialTodo) => ({
                url: '/todos',
                method: 'PATCH',
                body: {
                    ...initialTodo,
                },
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Todo', id: arg.id }],
        }),
        // DELETE
        deleteTodos: builder.mutation({
            query: (_id) => ({
                url: '/todos',
                method: 'DELETE',
                body: _id,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Todo', id: arg.id }],
        }),
    }),
});

export const {
    useGetTodosQuery,
    useLazyGetTodosQuery,
    useAddTodosMutation,
    useUpdateTodosMutation,
    useDeleteTodosMutation,
} = extendedTodosSlice;
