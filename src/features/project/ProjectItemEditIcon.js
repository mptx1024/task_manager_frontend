import { IconButton } from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

const ProjectItemEditIcon = ({ setIsEditing }) => {
    return (
        <IconButton
            sx={{
                '&:hover': {
                    background: 'transparent',
                },
                borderRadius: 0,
                width: '10%',
            }}
            onClick={() => setIsEditing(true)}
        >
            <MoreHorizOutlinedIcon sx={{ '&:hover': { color: 'blue' } }} />
        </IconButton>
    );
};
export default ProjectItemEditIcon;
