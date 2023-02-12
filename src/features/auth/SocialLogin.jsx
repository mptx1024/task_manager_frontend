import { FacebookLoginButton, GoogleLoginButton, GithubLoginButton } from 'react-social-login-buttons';
import { signInWithGoogle } from '../../config/firebase';

const SocialLogin = () => {
    const onGoogleClick = () => {
        signInWithGoogle();
    };
    const onLoginClick = () => {
        alert('Working in progress');
    };
    return (
        <div style={{ margin: 0, padding: 0 }}>
            <GoogleLoginButton onClick={onGoogleClick} />
            <GithubLoginButton onClick={onLoginClick} />
            <FacebookLoginButton onClick={onLoginClick} />
        </div>
    );
};
export default SocialLogin;
