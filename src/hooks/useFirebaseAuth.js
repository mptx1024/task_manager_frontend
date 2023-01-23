import { getAuth, getIdToken, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../features/auth/authSlice';
import { signInAnonymous } from '../config/firebase';

const altPhoto = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';
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
                setAuthUser(authUser);
                dispatch(
                    login({
                        email: authUser.email,
                        displayName: authUser.displayName?.split(' ')[0],
                        photoUrl:
                            !authUser.photoURL || authUser.photoURL === 'https://fakephoto.com'
                                ? altPhoto
                                : authUser.photoURL,
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
        });
        return () => unListen();
    }, []);
    return authUser;
};
export default useFirebaseAuth;
