import React, { useEffect, useState } from 'react';
import Sidebar from '../components/global/SidebarPro';
import Topbar from '../components/global/Topbar';
import { dashboardRouter } from '../router';
import Watchlist from '../pages/Watchlist/Watchlist';
import Dashboard from '../pages/Dashboard';
import { Outlet } from 'react-router-dom';

const MainLayout = ({ children }) => {
    const [isSidebar, setIsSidebar] = useState(true);

    useEffect(() => {
        console.log(children);
        /* const token = Cookies.get("_jwtToken");
         if (token) {
             window.location = "/login";
         }*/
    }, [children])

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