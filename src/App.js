import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
// import Sidebar from './pages/global/SidebarPro';
// import Topbar from './pages/global/Topbar';
// import Watchlist from './pages/Watchlist/Watchlist';
import PublicLayout from './layout/PublicLayout';
import MainLayout from './layout/MainLayout';
// import Login from './pages/login/Login';

function App() {


  return (
    <>
      <Routes>
        <Route path="/*" element={<PublicLayout />}>
        </Route>
        <Route path="dashboard/*" element={<MainLayout />}>
        </Route>
      </Routes>
    </>
  );


}

export default App;
