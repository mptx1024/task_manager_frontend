import { apiSlice } from '../../app/api/apiSlice';
// import { current } from '@reduxjs/toolkit';

export const todosApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => ({
                url: '/todos',
            }),

            providesTags: (result = [], error, arg) => {
                return result
                    ? [{ type: 'Todo', id: 'LIST' }, ...result.map(({ _id: id }) => ({ type: 'Todo', id }))]
                    : [{ type: 'Todo', id: 'LIST' }];
            },
        }),
        getTodo: builder.query({
            query: (id) => `/todos/${id}`,
            keepUnusedDataFor: 3600,
            providesTags: (result, error, id) => [{ type: 'Todo', id }],
        }),

        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: { ...todo }, // Include UID, title, completed
            }),
            async onQueryStarted(todo, { dispatch, queryFulfilled, getCacheEntry }) {
                const temp_cache_id = Date.now().toString();
                const patchTodoList = dispatch(
                    todosApiSlice.util.updateQueryData('getTodos', 'todosList', (draft) => {
                        draft?.push({ ...todo, _id: temp_cache_id });
                    })
                );
                await dispatch(
                    apiSlice.util.upsertQueryData('getTodo', temp_cache_id, { ...todo, _id: temp_cache_id })
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchTodoList.undo();
                }
            },
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
                        const todo = draft.find((todo) => todo._id === id);
                        if (todo) {
                            Object.assign(todo, { id, ...patch });
                        }
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
                        return null;
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
