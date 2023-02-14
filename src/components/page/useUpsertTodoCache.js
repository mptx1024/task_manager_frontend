import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { apiSlice } from '../../app/api/apiSlice';

export const useUpsertTodoCache = (todos) => {
    const [isUpserting, setIsUpserting] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log('in useEffect, todos:', todos);
        const upsertGetTodoCache = (todos) => {
            const promises = [];
            let len = todos.length;
            while (len--) {
                promises.push(dispatch(apiSlice.util.upsertQueryData('getTodo', todos[len]._id, { ...todos[len] })));
            }
            Promise.all(promises).then(setIsUpserting(false));
        };
        if (todos) {
            upsertGetTodoCache(todos);
            console.log('finished upserting');
        }
    }, [dispatch, todos]);

    return { isUpserting };
};
