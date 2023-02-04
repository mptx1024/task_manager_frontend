import StyledButton from '../../components/muiTemplate/StyledButton';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarIcon } from '../../components/asset/svgIcons';
import { Typography } from '@mui/material';

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
                <CalendarIcon fontSize='small' />
                {dueDate ? (
                    <Typography>{dueDate.toLocaleDateString('en-US')}</Typography>
                ) : text ? (
                    <Typography>{text}</Typography>
                ) : null}
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
