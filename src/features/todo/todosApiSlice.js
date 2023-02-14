import { apiSlice } from '../../app/api/apiSlice';
import { current } from '@reduxjs/toolkit';
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
            // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            //     console.log('🚀 ~ file: todosApiSlice.js:37 ~ onQueryStarted ~ todo', arg);
            //     try {
            //         const { data: todos } = await queryFulfilled;
            //         const promises = [];
            //         let len = todos.length;
            //         while (len--) {
            //             promises.push(
            //                 dispatch(apiSlice.util.upsertQueryData('getTodo', todos[len]._id, { ...todos[len] }))
            //             );
            //         }
            //         const res = await Promise.all(promises);
            //         console.log('🚀 ~ file: todosApiSlice.js:48 ~ onQueryStarted ~ res', res);
            //     } catch {}
            // },

            providesTags: (result = [], error, arg) => {
                return result
                    ? [{ type: 'Todo', id: 'LIST' }, ...result.map(({ _id: id }) => ({ type: 'Todo', id }))]
                    : [{ type: 'Todo', id: 'LIST' }];
            },
        }),
        getTodo: builder.query({
            query: (id) => `/todos/${id}`,
            providesTags: (result, error, id) => [{ type: 'Todo', id }],
        }),

        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: { ...todo }, // Include UID, title, completed
            }),
            // async onQueryStarted({ ...todo }, { dispatch, queryFulfilled }) {
            //     console.log('🚀 ~ file: todosApiSlice.js:60 ~ onQueryStarted ~ todo', todo);

            //     const patchTodoList = dispatch(
            //         todosApiSlice.util.updateQueryData('getTodos', 'todosList', (draft) => {
            //             draft.push({ ...todo, _id: '123' });
            //         })
            //     );
            //     try {
            //         await queryFulfilled;
            //     } catch (error) {
            //         patchTodoList.undo();
            //     }
            // },
            // invalidatesTags: ['Todo'],
            invalidatesTags: (result, error, arg) => [{ type: 'Todo', id: 'LIST' }],
        }),

        updateTodo: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/todos/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getTodo', id, (draft) => {
                        // console.log('🚀 ~ file: todosApiSlice.jsx:58 ~ patchResult ~ draft', patch);
                        Object.assign(draft, patch);
                    })
                );

                const action = dispatch(
                    apiSlice.util.updateQueryData('getTodos', 'todosList', (draft) => {
                        // console.log('before', current(draft));
                        const todo = draft.find((todo) => todo._id === id);
                        if (todo) {
                            Object.assign(todo, { id, ...patch });
                        }
                        // console.log('after', current(draft));
                    })
                );

                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                    action.undo();
                }
            },

            // invalidatesTags: (result, error, arg) => [{ type: 'Todo', id: 'LIST' }],
        }),
        deleteTodo: builder.mutation({
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
                // body: _id,
            }),
            async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getTodo', id, (draft) => {
                        // console.log(id);
                        // console.log(current(draft));
                        return null;
                        // // draft.forEach((todo) => todo._id !== id);
                        // // console.log(current(draft));
                    })
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                }
            },
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
