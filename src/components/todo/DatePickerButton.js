import StyledButton from '../muiTemplate/StyledButton';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Popover from '@mui/material/Popover';
import EventIcon from '@mui/icons-material/Event';

const DatePickerButton = () => {
    // const [anchorEl, setAnchorEl] = useState(null);
    // const [showPopover, setShowPopover] = useState(false);
    const [startDate, setStartDate] = useState(undefined);
    const [isOpen, setIsOpen] = useState(false);
    console.log(startDate);
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
        setStartDate(e);
    };
    const handleClickOutside = (e) => {
        setIsOpen(!isOpen);
        // setStartDate(e);
    };

    return (
        <div>
            <StyledButton onClick={handleClick} variant='outlined' size='small' startIcon={<EventIcon />}>
                {/* {format(startDate, 'dd-MM-yyyy')} */}
                {startDate ? startDate?.toLocaleDateString('en-US') : 'Due Date'}
            </StyledButton>
            {isOpen && (
                <div style={{ display: 'flex', maxWidth: '200px', position: 'absolute', zIndex: '100' }}>
                    <DatePicker
                        onClickOutside={handleClickOutside}
                        selected={startDate}
                        onChange={handleChange}
                        inline
                    />
                </div>
            )}
            {/* <Popover
                anchorEl={anchorEl}
                open={showPopover}
                onClose={onCloseClick}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} inline />
                </div>
            </Popover> */}
        </div>
    );
};

export default DatePickerButton;
