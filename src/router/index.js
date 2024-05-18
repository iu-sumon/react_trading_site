import Dashboard from "../pages/Dashboard";
import Trade from "../pages/Trade/Trade";


export const adminRouter = [
    {
        path: '/',
        element: <Dashboard />
    },
    {
        path: '/trade',
        element: <Trade />
    },
    // {
    //     path: '/change-password',
    //     element: <ChangePasswordPage />
    // }
];