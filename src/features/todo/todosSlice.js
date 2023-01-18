import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const todosAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
});
const initialState = todosAdapter.getInitialState();

export const extendedTodosSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todos',
            transformResponse: (response) => {
                return todosAdapter.setAll(initialState, response);
            },
            providesTags: (result, error, arg) => [
                { type: 'Todo', id: 'LIST' },
                ...result.ids.map((id) => ({ type: 'Todo', id })),
            ],
        }),

        addTodos: builder.mutation({
            query: (initialTodo) => ({
                url: '/todos',
                method: 'POST',
                body: {
                    ...initialTodo,
                    userId: Number(initialTodo.userId), //make sure type is Numeber
                    date: new Date().toISOString(),
                },
            }),
            invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
        }),

        updateTodos: builder.mutation({
            query: (initialTodo) => ({
                url: `/todos/${initialTodo.id}`,
                method: 'PUT',
                body: {
                    ...initialTodo,
                },
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Todo', id: arg.id }],
        }),

        deleteTodos: builder.mutation({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
                body: id,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Todo', id: arg.id }],
        }),
    }),
});

export const { useGetTodosQuery, useAddTodosMutation, useUpdateTodosMutation, useDeleteTodosMutation } =
    extendedTodosSlice;
