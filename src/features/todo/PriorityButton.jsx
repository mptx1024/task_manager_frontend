import StyledButton from '../../components/muiTemplate/StyledButton';
import FlagIcon from '../../components/asset/flag_FILL0_wght400_GRAD0_opsz48.svg';
const PriorityButton = ({ text, variant }) => {
    return (
        <StyledButton variant={variant} size='small'>
            <img src={FlagIcon} alt='event-img' />
            {text ? <span>{text}</span> : null}
        </StyledButton>
    );
};
export default PriorityButton;
