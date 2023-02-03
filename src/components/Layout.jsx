import { Outlet } from 'react-router-dom';
import Navbar from './nav/Navbar';
import SideBar from './nav/Sidebar';
import { Box } from '@mui/material';
import Footer from './Footer';
import BodyLayout from './BodyLayout';
import Prefetch from '../features/auth/Prefetch';
/**
 *  The parent layout for entire app except nav
 *
 */
const Layout = () => {
    return (
        <>
            <Navbar />
            <SideBar />
            <BodyLayout>
                <Outlet />
            </BodyLayout>
        </>
    );
};

export default Layout;
