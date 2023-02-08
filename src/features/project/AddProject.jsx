import { useState } from 'react';

import { AddIcon } from '../../components/asset/svgIcons';
import { ListItem, Input, ListItemIcon } from '@mui/material';

const AddProject = ({ onClickAddProject, title, onChangeTitle }) => {
    return (
        <ListItem sx={{ pl: '1.1rem' }}>
            <ListItemIcon>
                <AddIcon
                    onClick={onClickAddProject}
                    sx={{
                        color: 'secondary.main',
                        '&:hover': { backgroundColor: 'action.hover' },
                        cursor: 'pointer',
                    }}
                />
            </ListItemIcon>
            <Input
                autoComplete='false'
                type='text'
                placeholder='New project'
                onChange={onChangeTitle}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') onClickAddProject();
                }}
                value={title}
                disableUnderline={true}
                required
                sx={{ maxWidth: '7rem' }}
            />
        </ListItem>
    );
};
export default AddProject;
