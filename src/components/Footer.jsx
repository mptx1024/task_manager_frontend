import { GitHubIcon } from './asset/svgIcons';

const Footer = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 'auto',
            }}
        >
            <span>Made By</span>
            <a href='https://github.com/fjiaSigmoid' style={{ display: 'flex' }}>
                <GitHubIcon viewBox='0 0 30 30' sx={{ ml: '0.3rem' }} />
                <span>@fjiaSigmoid</span>
            </a>
        </div>
    );
};
export default Footer;
