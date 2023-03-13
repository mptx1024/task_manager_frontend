import { AllIcon, SunIcon, FlagOutlinedIcon, CalendarOverdueIcon } from '../../asset/svgIcons';

import { useNavigate } from 'react-router-dom';

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

const Categories = ({ dispatch, toggleSideBar }) => {
    const navigate = useNavigate();
    const breakpoint = 560; // At which px the sidebar should slide out upon clicking
    const onClickAll = () => {
        if (document.documentElement.clientWidth <= breakpoint) {
            dispatch(toggleSideBar());
        }
        navigate('/all');
    };
    const onClickToday = () => {
        if (document.documentElement.clientWidth <= breakpoint) {
            dispatch(toggleSideBar());
        }
        navigate('/today');
    };
    const onClickPriority = () => {
        if (document.documentElement.clientWidth <= breakpoint) {
            dispatch(toggleSideBar());
        }
        navigate('/priority');
    };
    const onClickOverdue = () => {
        if (document.documentElement.clientWidth <= breakpoint) {
            dispatch(toggleSideBar());
        }
        navigate('/overdue');
    };
    return (
        <List
            sx={{
                '.MuiListItemIcon-root': {
                    minWidth: '2.5rem',
                },
            }}
        >
            <ListItem disablePadding>
                <ListItemButton onClick={onClickAll}>
                    <ListItemIcon>
                        <AllIcon />
                    </ListItemIcon>
                    <ListItemText primary={'All'} />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={onClickPriority}>
                    <ListItemIcon>
                        <FlagOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Priority'} />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={onClickToday}>
                    <ListItemIcon>
                        <SunIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Today'} />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={onClickOverdue}>
                    <ListItemIcon>
                        <CalendarOverdueIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Overdue'} />
                </ListItemButton>
            </ListItem>
        </List>
    );
};
export default Categories;
