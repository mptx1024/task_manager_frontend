import { Outlet } from 'react-router-dom';
import Navbar from './nav/Navbar';

/**
 *  The parent layout for entire app except nav
 *
 */
const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default Layout;
