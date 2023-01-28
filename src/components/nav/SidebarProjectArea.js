import {
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Input,
    IconButton,
} from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const SidebarProjectArea = () => {
    const projectSample = [
        { title: 'House', _id: '1' },
        { title: 'coding', _id: '2' },
    ];
    return (
        <>
            <Typography variant='subtitle1' sx={{ ml: 2, mt: 3, fontWeight: 'bold', color: 'grey' }}>
                Projects
            </Typography>
            <List>
                {projectSample.map((project) => (
                    <ListItem key={project._id} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <CircleOutlinedIcon sx={{ width: 20, height: 20 }} />
                            </ListItemIcon>
                            <ListItemText primary={project.title} />
                        </ListItemButton>
                    </ListItem>
                ))}

                <ListItem>
                    <Input
                        autoComplete='false'
                        id='login'
                        type='text'
                        placeholder='New project'
                        disableUnderline={true}
                    />
                    <IconButton>
                        <AddOutlinedIcon />
                    </IconButton>
                </ListItem>
            </List>
        </>
    );
};
export default SidebarProjectArea;
