import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Sidebar from '../components/global/SidebarPro';
import Topbar from '../components/global/Topbar';
// import Watchlist from '../components/Watchlist/Watchlist';
import { dashboardRouter } from '../router';

const MainLayout = () => {
    const [isSidebar, setIsSidebar] = useState(true);

    useEffect(() => {
        /* const token = Cookies.get("_jwtToken");
         if (token) {
             window.location = "/login";
         }*/
    }, [])

    return (
        <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
                <Topbar setIsSidebar={setIsSidebar}></Topbar>
                {/* <Watchlist></Watchlist> */}
                <div className='container'>
                    <Routes>
                        {dashboardRouter.map((route, key) => {
                            return <Route path={route.path} key={key} element={route.element} />
                        })}
                    </Routes>
                </div>
            </main>
        </div>
    );
};

export default MainLayout;