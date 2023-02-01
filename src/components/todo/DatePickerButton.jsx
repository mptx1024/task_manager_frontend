import StyledButton from '../muiTemplate/StyledButton';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import EventIcon from '../asset/event_FILL0_wght400_GRAD0_opsz48.svg';
import { Avatar } from '@mui/material';

const DatePickerButton = ({ setDueDate, dueDate, text, variant }) => {
    // const [anchorEl, setAnchorEl] = useState(null);
    // const [showPopover, setShowPopover] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    // const onOpenClick = (e) => {
    //     setShowPopover((prev) => !prev);
    //     setAnchorEl(e.currentTarget);
    // };
    // const onCloseClick = () => {
    //     setShowPopover((prev) => !prev);
    //     // setAnchorEl(null);
    // };
    const handleClick = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };
    const handleChange = (e) => {
        setIsOpen(!isOpen);
        setDueDate(e);
    };
    const handleClickOutside = (e) => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <StyledButton onClick={handleClick} variant={variant} size='small'>
                <img src={EventIcon} alt='event-img' />
                {text ? <span>{dueDate ? dueDate?.toLocaleDateString('en-US') : text}</span> : null}
            </StyledButton>
            {isOpen && (
                <div style={{ display: 'flex', maxWidth: '500px', position: 'absolute', zIndex: '100' }}>
                    <DatePicker
                        // dateFormat='MM-DD-YYYY'
                        onClickOutside={handleClickOutside}
                        selected={new Date()}
                        onChange={handleChange}
                        inline
                        minDate={new Date()}
                        isClearable={true}
                        placeholderText='Select a day'
                    />
                </div>
            )}
        </>
    );
};

export default DatePickerButton;
