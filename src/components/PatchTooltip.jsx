import { Tooltip } from '@mui/material';

const PatchTooltip = ({ children, ...props }) => (
    <Tooltip {...props}>
        <div style={{ margin: '0 0' }}>{children}</div>
    </Tooltip>
);
export default PatchTooltip;
