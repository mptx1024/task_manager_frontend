import DataFetchingBackdrop from '../../components/Backdrop';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, selectCurrentUser } from './authSlice';
import { auth } from '../../config/firebase';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

const PersistLogin = () => {
    const dispatch = useDispatch();
    const userInState = useSelector(selectCurrentUser);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser && !userInState) {
                // console.log(`Time to dispatch setCredentials`);
                dispatch(
                    setCredentials({
                        email: authUser.email,
                        firstName: authUser.displayName?.split(' ')[0],
                        lastName: authUser.displayName?.split(' ')[1],
                        photoUrl: authUser.photoURL
                            ? authUser.photoURL
                            : authUser.isAnonymous
                            ? 'https://winaero.com/blog/wp-content/uploads/2019/09/Chrome-Incognito-Mode-Icon-256.png'
                            : null,
                        uid: authUser.uid,
                        firebaseIdToken: authUser.accessToken,
                        isAnonymous: authUser.isAnonymous, // anonymous login
                    })
                );
            }
        });
        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return userInState ? <Outlet /> : <DataFetchingBackdrop />;
};
export default PersistLogin;
