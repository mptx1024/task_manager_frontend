import { GitHubIcon } from './asset/svgIcons';

const Footer = () => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 'auto',
                marginBottom: '1rem',
                fontSize: '0.9rem',
            }}
        >
            <span>Made By</span>
            <a href='https://github.com/fjiasigmoid/task_manager_frontend' style={{ display: 'flex' }}>
                <GitHubIcon viewBox='0 0 30 30' />
                <span>@fjiaSigmoid</span>
            </a>
        </div>
    );
};
export default Footer;
