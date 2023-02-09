import StyledButton from '../../components/muiTemplate/StyledButton';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { compareDates } from '../util/compareDates';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarIcon } from '../../components/asset/svgIcons';
import { Typography } from '@mui/material';

const DatePickerButton = ({ setDueDate, dueDate, text, variant }) => {
    const [isOpen, setIsOpen] = useState(false);

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
    const overdue = compareDates(dueDate);

    return (
        <>
            <StyledButton onClick={handleClick} variant={variant} size='small' overdue={overdue}>
                <CalendarIcon fontSize='small' />
                {dueDate ? (
                    <Typography color='red'>{dueDate.toLocaleDateString('en-US')}</Typography>
                ) : text ? (
                    <Typography>{text}</Typography>
                ) : null}
            </StyledButton>
            {isOpen && (
                <div
                    style={{
                        // display: 'flex',
                        // maxWidth: '800px',
                        // maxHeight: '800px',
                        position: 'absolute',
                        zIndex: '100',
                    }}
                >
                    <DatePicker
                        // dateFormat='MM-DD-YYYY'
                        onClickOutside={handleClickOutside}
                        // selected={new Date()}
                        onChange={handleChange}
                        inline
                        // minDate={new Date()}
                        isClearable={true}
                        placeholderText='Select a day'
                    />
                </div>
            )}
        </>
    );
};

export default DatePickerButton;
