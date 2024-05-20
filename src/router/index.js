import Dashboard from "../pages/Dashboard";
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
    // {
    //     path: '*',
    //     element: <ErrorPage />
    // }
    // {
    //     path: '/change-password',
    //     element: <ChangePasswordPage />
    // }
];