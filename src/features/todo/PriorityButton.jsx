import StyledButton from '../../components/muiTemplate/StyledButton';
import FlagFilledIcon from '../../components/asset/flag_filled.svg';
import FlagOutlinedIcon from '../../components/asset/flag_outlined.svg';

import { Typography } from '@mui/material';
const PriorityButton = ({ text, variant, priority, setPriority }) => {
    const onClickPriority = () => {
        setPriority(!priority);
    };
    return (
        <StyledButton variant={variant} size='small' onClick={onClickPriority}>
            <img src={priority ? FlagFilledIcon : FlagOutlinedIcon} alt='event-img' />
            <Typography> {text ? text : null}</Typography>
        </StyledButton>
    );
};
export default PriorityButton;
