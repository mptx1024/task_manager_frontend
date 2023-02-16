import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function DataFetchingBackdrop({ message }) {
    return (
        <Backdrop sx={{ color: 'background.default', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
            <CircularProgress color='secondary' />
        </Backdrop>
    );
}
