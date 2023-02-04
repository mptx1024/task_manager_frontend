import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { login, logout } from './authSlice';
import { signInAnonymous } from '../../config/firebase';
import { auth } from '../../config/firebase';
const Login = () => {
    const dispatch = useDispatch();
    const userInState = useSelector((state) => state.auth.user);

    useEffect(() => {
        onAuthStateChanged(getAuth(), (authUser) => {
            if (authUser) {
                dispatch(
                    login({
                        email: authUser.email,
                        firstName: authUser.displayName?.split(' ')[0],
                        lastName: authUser.displayName?.split(' ')[1],
                        photoUrl: authUser.photoURL,
                        uid: authUser.uid,
                        firebaseIdToken: authUser.auth.currentUser.accessToken,
                        isAnonymous: authUser.email ? false : true, // anonymous login
                    })
                );
            } else {
                signInAnonymous();
                // console.log('user is logged out');
            }
        });
    }, []);

    if (userInState) {
        return <Outlet />;
    }
    return <div>Logging in.....</div>;
};
export default Login;

// if (userInState) {
//     navigate('/all');
// }
