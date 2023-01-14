import { Box, Button, Typography } from '@mui/material';
import useCollapse from 'react-collapsed';
import TodoList from './TodoList';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { color } from '@mui/system';
const CompletedPanel = () => {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({ duration: 100 });
    // console.log('in CompletePanel:');
    return (
        <div>
            <div {...getToggleProps()} style={{ cursor: 'pointer', fontWeight: 'bolder' }}>
                <ArrowForwardIosIcon sx={{ ...(isExpanded && { transform: 'rotate(90deg)' }) }} />
                {isExpanded ? 'Completed' : 'Completed'}
            </div>
            <section {...getCollapseProps()}>
                {/* Collapsed content 🙈 */}
                <TodoList isCompletePanel={true} />
            </section>
        </div>
    );
};

export default CompletedPanel;

