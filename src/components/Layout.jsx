import { Outlet } from 'react-router-dom';
/**
 *  The parent layout for entire app
 */
const Layout = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default Layout;
