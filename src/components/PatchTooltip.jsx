import { Tooltip } from '@mui/material';
import { useState } from 'react';

const PatchTooltip = ({ children, ...props }) => {
    const [open, setOpen] = useState(false);

    return (
        <Tooltip
            {...props}
            // disableHoverListener
            open={open}
            onClick={() => setOpen(false)}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <div style={{ margin: '0 0' }}>{children}</div>
        </Tooltip>
    );
};
export default PatchTooltip;
