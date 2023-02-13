import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

// const todosAdapter = createEntityAdapter({
//     /**
//      selectId: A function that accepts a single Entity instance, and returns the value of whatever unique ID field is inside. If not provided, the default implementation is entity => entity.id. If your Entity type keeps its unique ID values in a field other than entity.id, you must provide a selectId function.
//      */
//     // _id() is a mongoose auto-generated field
//     selectId: (todo) => (todo._id ? todo._id : null),
//     // Sort by date:
//     // sortComparer: (a, b) => b.date.localeCompare(a.date)

//     // Sort completed note to the bottom:
//     // if a and b are both completed, don't change the sequence; if a is completed but b is not, return 1, which switch their order
//     sortComparer: (a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1),
// });
// const initialState = todosAdapter.getInitialState();

export const todosApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTodos: builder.query({
            // GET
            query: () => ({
                url: '/todos',
                // https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery#handling-non-standard-response-status-codes
                // validateStatus: (response, result) => {
                //     // console.log(result);
                //     return response.status === 200 && !result.isError;
                // },
            }),
            // transformResponse: (responseData) => {
            //     // console.log('🚀 ~ file: todosApiSlice.js:27 ~ responseData', responseData);
            //     // const loadedTodos = responseData.map((todo) => {
            //     //     todo.id = todo._id;
            //     // });
            //     return todosAdapter.setAll(initialState, responseData);
            // },
            providesTags: (result = [], error, arg) => {
                return result
                    ? [{ type: 'Todo', id: 'LIST' }, ...result.map(({ _id }) => ({ type: 'Todo', _id }))]
                    : [{ type: 'Todo', id: 'LIST' }];
            },
        }),
        //GET
        getTodo: builder.query({
            query: (id) => `/todos/${id}`,
            providesTags: (result, error, id) => [{ type: 'Todo', id }],
        }),

        // POST
        addTodo: builder.mutation({
            query: (initialTodo) => ({
                url: '/todos',
                method: 'POST',
                body: {
                    ...initialTodo, // Include UID, title, completed
                },
            }),
            // async onQueryStarted({ initialTodo }, { dispatch, queryFulfilled }) {
            //     const patchResult = dispatch(
            //         todosApiSlice.util.updateQueryData('getTodos', 'todosList', (draft) => {
            //             console.log('🚀 ~ file: todosApiSlice.jsx:58 ~ patchResult ~ draft', draft);
            //             draft.push(initialTodo);
            //         })
            //     );
            //     try {
            //         await queryFulfilled;
            //     } catch (error) {
            //         patchResult.undo();
            //     }
            // },
            invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
        }),

        // PATCH
        updateTodo: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/todos/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                // console.log('🚀 ~ file: todosApiSlice.js:83 ~ onQueryStarted ~ id', id);
                // console.log('🚀 ~ file: todosApiSlice.js:83 ~ onQueryStarted ~ todo', patch);
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getTodo', id, (draft) => {
                        // console.log('🚀 ~ file: todosApiSlice.jsx:58 ~ patchResult ~ draft', patch);
                        Object.assign(draft, patch);
                    })
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                }
            },
            // invalidatesTags: (result, error, arg) => {
            //     console.log('🚀 ~ file: todosApiSlice.js:93 ~ arg', arg);
            //     return [
            //         { type: 'Todo', id: arg._id },
            //         // { type: 'Todo', id: 'LIST' },
            //         { type: 'Project', id: 'LIST' },
            //     ];
            // },
        }),
        // DELETE
        deleteTodo: builder.mutation({
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
                // body: _id,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Todo', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetTodosQuery,
    useGetTodoQuery,
    useLazyGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} = todosApiSlice;
