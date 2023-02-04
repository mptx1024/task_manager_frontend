import StyledButton from '../../components/muiTemplate/StyledButton';

import { FlagFilledIcon, FlagOutlinedIcon } from '../../components/asset/svgIcons';

import { Typography } from '@mui/material';
const PriorityButton = ({ text, variant, priority, setPriority }) => {
    const onClickPriority = () => {
        setPriority(!priority);
    };
    return (
        <StyledButton variant={variant} size='small' onClick={onClickPriority}>
            {priority ? <FlagFilledIcon fontSize='small' /> : <FlagOutlinedIcon fontSize='small' />}
            {text ? <Typography>{text}</Typography> : null}
        </StyledButton>
    );
};
export default PriorityButton;
