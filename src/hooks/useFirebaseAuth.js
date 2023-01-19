import { getAuth, getIdToken, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../features/auth/authSlice';

const useFirebaseAuth = () => {
    const dispatch = useDispatch();
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        // https://firebase.google.com/docs/reference/js/auth.auth#authonauthstatechanged
        // The onAuthStateChanged() function actually returns a function that you can call to unsubscribe
        const unListen = onAuthStateChanged(getAuth(), async (authUser) => {
            console.log('onAuthStateChanged executed');
            /**
             *  It makes logic sense to update or flush Redux state whenever the auth state is changed.
             */
            if (authUser) {
                // idToken used to get verified in BE with firebase admin SDK
                const firebaseIdToken = await getIdToken(authUser);
                console.log('🚀 ~ file: useFirebaseAuth.js:12 ~ unListen ~ token', firebaseIdToken);
                authUser = { ...authUser, type: 'myType' };
                setAuthUser(authUser);
                dispatch(
                    login({
                        email: authUser.email,
                        uid: authUser.uid,
                        displayName: authUser.displayName,
                        photoUrl: authUser.photoURL,
                        firebaseIdToken,
                    })
                );
            } else {
                setAuthUser(null);
                // Clear the Redux state
                dispatch(logout());
            }
        });
        return () => unListen();
    }, []);
    return authUser;
};
export default useFirebaseAuth;
