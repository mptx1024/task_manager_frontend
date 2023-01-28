import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
        <div>
            <span style={{ display: 'flex' }}>
                <span>Made By</span>
                <a href='https://github.com/fjiaSigmoid' style={{ display: 'flex' }}>
                    <GitHubIcon sx={{ mx: 0.5 }} />
                    <span>@fjiaSigmoid</span>
                </a>
            </span>
        </div>
    );
};
export default Footer;
