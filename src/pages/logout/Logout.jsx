import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../slices/userSlice';
import adminServer from '../../utilities/server/adminServer';
import { API_LOGOUT } from '../../utilities/apiRequest/auth';
import errorHandler from '../../utilities/errorHandler';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        adminServer.post(API_LOGOUT, {}, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((res) => {

            // Dispatch the logout action
            dispatch(logout());

            // Redirect to the login page
            navigate('/login');
        }).catch((err) => {
            errorHandler(err);
        }).finally(() => {
            // setLoading(false);
        });

    }, [dispatch, navigate]);

    // Optional: You can show a loading state while redirecting
    return <div>Logging out...</div>;
};

export default Logout;