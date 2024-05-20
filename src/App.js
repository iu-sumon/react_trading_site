import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './layout/MainLayout';
import { dashboardRouter } from './router';
import Login from './pages/login/Login';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes (no layout) */}
        <Route path="/login" element={<Login />} />

        {/* Authenticated routes with AuthLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          {dashboardRouter.map((route, key) => {
            return <Route path={route.path} key={key} element={route.element} />
          })}
        </Route>
        {/* <Route path="*" element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
  );


}

export default App;
