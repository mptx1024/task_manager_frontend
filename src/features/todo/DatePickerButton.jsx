import StyledButton from '../../components/muiTemplate/StyledButton';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { isOverdue } from '../util/isOverdue';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarIcon } from '../../components/asset/svgIcons';
import { Typography, Popover } from '@mui/material';

const DatePickerButton = ({ setDueDate, dueDate, text, variant }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showPopover, setShowPopover] = useState(false);

    const onClickDateButton = (e) => {
        e.preventDefault();
        setShowPopover(!showPopover);
        setAnchorEl(e.currentTarget);
    };
    const onDateChange = (e) => {
        setShowPopover(!showPopover);
        setDueDate(e);
    };

    const onClickClose = () => {
        setShowPopover((prev) => !prev);
    };

    const onClickReset = () => {
        setDueDate(null);
        setShowPopover(!showPopover);
    };

    const overdue = isOverdue(dueDate);

    return (
        <>
            <StyledButton onClick={onClickDateButton} variant={variant} size='small' overdue={overdue}>
                <CalendarIcon fontSize='small' />
                {dueDate ? (
                    <Typography color='red'>{dueDate.toLocaleDateString('en-US')}</Typography>
                ) : text ? (
                    <Typography>{text}</Typography>
                ) : null}
            </StyledButton>
            <Popover
                sx={{ p: 0, m: 0 }}
                anchorEl={anchorEl}
                open={showPopover}
                onClose={onClickClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div>
                    <DatePicker
                        onChange={onDateChange}
                        inline
                        minDate={new Date()}
                        placeholderText='Select a day'
                    />
                    <button style={{ width: '100%', display: 'block' }} onClick={onClickReset}>
                        No due date
                    </button>
                </div>
            </Popover>
        </>
    );
};

export default DatePickerButton;
