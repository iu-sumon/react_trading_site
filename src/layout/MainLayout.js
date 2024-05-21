import React, { useEffect, useState } from 'react';
import Sidebar from '../components/global/SidebarPro';
import Topbar from '../components/global/Topbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MainLayout = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [isSidebar, setIsSidebar] = useState(true);

    useEffect(() => {
        if (!user.isLoggedIn) {
            navigate('/login');
        }
    }, [user]);

    return (
        <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
                <Topbar setIsSidebar={setIsSidebar}></Topbar>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;