import { useSelector, useDispatch } from 'react-redux';

const PageContainer = ({ children }) => {
    const dispatch = useDispatch();
    const isSideBarOpen = useSelector((state) => state.sideBar.sideBar);
    
    return <div>{children}</div>;
};
export default PageContainer;
