import { useNavigate } from 'react-router-dom';
import { getAuth, getIdToken, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { login, logout } from './authSlice';
import { signInAnonymous } from '../../config/firebase';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInState = useSelector((state) => state.auth.user);
    // const [authUser, setAuthUser] = useState(null);
    const unListen = onAuthStateChanged(getAuth(), async (authUser) => {
        console.log('onAuthStateChanged executed');
        /**
         *  It makes logic sense to update or flush Redux state whenever the auth state is changed.
         */
        if (authUser) {
            // console.log('🚀 ~ file: Login.jsx:21 ~ unListen ~ authUser', authUser);
            // idToken is for getting verified in BE with firebase admin SDK
            const firebaseIdToken = await getIdToken(authUser);
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
            signInAnonymous();
        }
    });


    return <div>Logging in.....</div>;
};
export default Login;

// if (userInState) {
//     navigate('/all');
// }
