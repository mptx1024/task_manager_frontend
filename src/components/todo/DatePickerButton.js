import StyledButton from '../muiTemplate/StyledButton';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// import Popover from '@mui/material/Popover';
import EventIcon from '@mui/icons-material/Event';

const DatePickerButton = ({ setDueDate, dueDate }) => {
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
        <div>
            <StyledButton onClick={handleClick} variant='outlined' size='small' startIcon={<EventIcon />}>
                {dueDate ? dueDate?.toLocaleDateString('en-US') : 'Due Date'}
            </StyledButton>
            {isOpen && (
                <div
                    style={{ display: 'flex', maxWidth: '500px', width: '500px', position: 'absolute', zIndex: '100' }}
                >
                    <DatePicker
                        dateFormat='MM-DD-YYYY'
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
