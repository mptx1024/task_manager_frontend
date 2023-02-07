import { SvgIcon } from '@mui/material';

/**
 * https://fonts.google.com/icons
 * Weight: 300; Optical size: 24px
 */

export const AllIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <path
                d='M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z'
                fill='inherit'
            />
        </SvgIcon>
    );
};

export const SunIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <path
                d='M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z'
                fill='inherit'
            />
        </SvgIcon>
    );
};
export const FlagFilledIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <path d='M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z' fill='inherit' />
        </SvgIcon>
    );
};

export const FlagOutlinedIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <path
                d='M5.5 20.75V4.5h8.1l.4 2h5.5v9h-6.1l-.4-2H7v7.25Zm7-10.75Zm2.15 4H18V8h-5.25l-.4-2H7v6h7.25Z'
                fill='inherit'
            />
        </SvgIcon>
    );
};

export const CalendarIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <path
                d='M14.7 18q-.975 0-1.65-.675-.675-.675-.675-1.625 0-.975.675-1.65.675-.675 1.65-.675.95 0 1.625.675T17 15.7q0 .95-.675 1.625T14.7 18Zm-9.4 3.5q-.75 0-1.275-.525Q3.5 20.45 3.5 19.7V6.3q0-.75.525-1.275Q4.55 4.5 5.3 4.5h1.4V2.375h1.525V4.5H15.8V2.375h1.5V4.5h1.4q.75 0 1.275.525.525.525.525 1.275v13.4q0 .75-.525 1.275-.525.525-1.275.525Zm0-1.5h13.4q.1 0 .2-.1t.1-.2v-9.4H5v9.4q0 .1.1.2t.2.1ZM5 8.8h14V6.3q0-.1-.1-.2t-.2-.1H5.3q-.1 0-.2.1t-.1.2Zm0 0V6v2.8Z'
                fill='inherit'
            />
        </SvgIcon>
    );
};
export const CalendarOverdueIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <path
                d='M17.5,12 C20.5376,12 23,14.4624 23,17.5 C23,20.5376 20.5376,23 17.5,23 C14.4624,23 12,20.5376 12,17.5 C12,14.4624 14.4624,12 17.5,12 Z M17.5,19.875 C17.1548,19.875 16.875,20.1548 16.875,20.5 C16.875,20.8452 17.1548,21.125 17.5,21.125 C17.8452,21.125 18.125,20.8452 18.125,20.5 C18.125,20.1548 17.8452,19.875 17.5,19.875 Z M17.75,3 C19.5449,3 21,4.45507 21,6.25 L21,12.0218 C20.5368,11.7253 20.0335,11.4858 19.5,11.3135 L19.5,8.5 L4.5,8.5 L4.5,17.75 C4.5,18.7165 5.2835,19.5 6.25,19.5 L11.3135,19.5 C11.4858,20.0335 11.7253,20.5368 12.0218,21 L6.25,21 C4.45507,21 3,19.5449 3,17.75 L3,6.25 C3,4.45507 4.45507,3 6.25,3 L17.75,3 Z M17.5,14 C17.2239,14 17,14.2239 17,14.5 L17,18.5 C17,18.7761 17.2239,19 17.5,19 C17.7761,19 18,18.7761 18,18.5 L18,14.5 C18,14.2239 17.7761,14 17.5,14 Z M17.75,4.5 L6.25,4.5 C5.2835,4.5 4.5,5.2835 4.5,6.25 L4.5,7 L19.5,7 L19.5,6.25 C19.5,5.2835 18.7165,4.5 17.75,4.5 Z'
                fill='inherit'
            />
        </SvgIcon>
    );
};
export const ProjectIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <path
                d='M11 20.5H5.3q-.75 0-1.275-.525Q3.5 19.45 3.5 18.7V5.3q0-.75.525-1.275Q4.55 3.5 5.3 3.5h4.425q.2-.725.837-1.213Q11.2 1.8 12 1.8q.825 0 1.463.487.637.488.837 1.213h4.4q.75 0 1.275.525.525.525.525 1.275V10H19V5.3q0-.1-.1-.2t-.2-.1h-2.2v2.625h-9V5H5.3q-.1 0-.2.1t-.1.2v13.4q0 .1.1.2t.2.1H11Zm4.5-.925-3.9-3.9 1.05-1.075 2.85 2.85 5.675-5.65 1.05 1.05ZM12 5.125q.375 0 .637-.263.263-.262.263-.662 0-.375-.263-.638Q12.375 3.3 12 3.3t-.637.262q-.263.263-.263.638 0 .4.263.662.262.263.637.263Z'
                fill='inherit'
            />
        </SvgIcon>
    );
};
export const DotIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <path
                d='M10.021 16.812q-1.417 0-2.656-.531-1.24-.531-2.177-1.469-.938-.937-1.469-2.177-.531-1.239-.531-2.635 0-1.417.531-2.646.531-1.229 1.469-2.166.937-.938 2.177-1.469Q8.604 3.188 10 3.188q1.417 0 2.646.531 1.229.531 2.166 1.469.938.937 1.469 2.166.531 1.229.531 2.625 0 1.417-.531 2.656-.531 1.24-1.469 2.177-.937.938-2.166 1.469-1.229.531-2.625.531Z'
                fill='inherit'
            />
        </SvgIcon>
    );
};
export const EllipsisIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <path
                d='M6.225 13.5q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.062Q5.6 10.5 6.225 10.5t1.063.438q.437.437.437 1.062t-.437 1.062q-.438.438-1.063.438Zm5.775 0q-.625 0-1.062-.438Q10.5 12.625 10.5 12t.438-1.062Q11.375 10.5 12 10.5t1.062.438q.438.437.438 1.062t-.438 1.062q-.437.438-1.062.438Zm5.775 0q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.062q.437-.438 1.062-.438t1.063.438q.437.437.437 1.062t-.437 1.062q-.438.438-1.063.438Z'
                fill='inherit'
            />
        </SvgIcon>
    );
};
