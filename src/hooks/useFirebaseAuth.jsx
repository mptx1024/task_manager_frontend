import { getAuth, getIdToken, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../features/auth/authSlice';
import { signInAnonymous } from '../config/firebase';

// const altPhoto = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';
const useFirebaseAuth = () => {
    const dispatch = useDispatch();
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        // https://firebase.google.com/docs/reference/js/auth.auth#authonauthstatechanged
        // The onAuthStateChanged() function actually returns a function that you can call to unsubscribe
        console.log('useFireBaseAuth');
        const unListen = onAuthStateChanged(getAuth(), async (authUser) => {
            console.log('onAuthStateChanged executed');
            /**
             *  It makes logic sense to update or flush Redux state whenever the auth state is changed.
             */
            if (authUser) {
                // console.log('🚀 ~ file: useFirebaseAuth.jsx:21 ~ unListen ~ authUser', authUser);
                // idToken used to get verified in BE with firebase admin SDK
                const firebaseIdToken = await getIdToken(authUser);
                setAuthUser(authUser);

                dispatch(
                    login({
                        email: authUser.email,
                        firstName: authUser.displayName?.split(' ')[0],
                        lastName: authUser.displayName?.split(' ')[1],
                        photoUrl: authUser.photoURL,
                        uid: authUser.uid,
                        firebaseIdToken,
                        isAnonymous: authUser.email ? false : true, // anonymous login
                    })
                );
            } else {
                setAuthUser(null);
                signInAnonymous();
                // Clear the Redux state
            }
            // console.log('🚀 ~ file: useFirebaseAuth.js:40 ~ unListen ~ authUser.displayName', authUser.displayName);
        });
        // return () => unListen();
    }, []);
    return authUser;
};
export default useFirebaseAuth;
