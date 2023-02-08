import { Typography, Box } from '@mui/material';
import { AllIcon, FlagOutlinedIcon, SunIcon, CalendarOverdueIcon, ProjectIcon } from '../asset/svgIcons';

const PageTitle = ({ title }) => {
    let icon;
    if (title === 'All') {
        icon = <AllIcon />;
    } else if (title === 'Priority') {
        icon = <FlagOutlinedIcon />;
    } else if (title === 'Today') {
        icon = <SunIcon />;
    } else if (title === 'Overdue') {
        icon = <CalendarOverdueIcon />;
    } else {
        icon = <ProjectIcon />;
    }
    return (
        <Box
            sx={{
                '& .MuiTypography-root': {
                    fontSize: '1.5rem',
                    fontWeight: '500',
                    color: 'secondary.main',
                    ml: '0.5rem',
                },
                '& .MuiSvgIcon-root': {
                    fontSize: '1.5rem',
                    fontWeight: '500',
                    color: 'secondary.main',
                },
                display: 'flex',
                alignItems: 'center',
            }}
        >
            {icon}
            <Typography>{title}</Typography>
        </Box>
    );
};
export default PageTitle;
