import { AllIcon, SunIcon, FlagOutlinedIcon, CalendarOverdueIcon } from '../../asset/svgIcons';

import { useNavigate } from 'react-router-dom';

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

const Categories = () => {
    const navigate = useNavigate();

    const onClickAll = () => {
        navigate('/all');
    };
    const onClickToday = () => {
        navigate('/today');
    };
    const onClickPriority = () => {
        navigate('/priority');
    };
    const onClickOverdue = () => {
        alert('This feature is in the roadmap');
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
