import { Outlet } from 'react-router-dom';
import Navbar from './nav/Navbar';
import Footer from './Footer';
/**
 *  The parent layout for entire app except nav
 *
 */
const Layout = () => {
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;
