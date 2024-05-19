import Dashboard from "../pages/Dashboard";
import Trade from "../pages/Trade/Trade";
import Watchlist from "../pages/Watchlist/Watchlist";


export const dashboardRouter = [
    {
        path: 'dashboard',
        element: <Dashboard />
    },
    {
        path: '/dashboard/trade',
        element: <Trade />
    },
    {
        path: '/dashboard/watchlist',
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