import Dashboard from "../pages/Dashboard";
import Logout from "../pages/logout/Logout";
import Trade from "../pages/Trade/Trade";
import Watchlist from "../pages/Watchlist/Watchlist";


export const dashboardRouter = [
    {
        path: '/',
        element: <Dashboard />
    },
    {
        path: '/dashboard',
        element: <Dashboard />
    },
    {
        path: '/trade',
        element: <Trade />
    },
    {
        path: '/watchlist',
        element: <Watchlist />
    },
    {
        path: '/logout',
        element: <Logout />
    },
    // {
    //     path: '*',
    //     element: <ErrorPage />
    // }
    // {
    //     path: '/change-password',
    //     element: <ChangePasswordPage />
    // }
];