import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import ErrorPage from "../pages/error/errorPage";
import Login from '../pages/login/Login';



const PublicLayout = () => {

    useEffect(() => {
        /* const token = Cookies.get("_jwtToken");
         if (token) {
             window.location = "/login";
         }*/
    }, [])

    return (
        <div>

            <Routes>
                <Route path={'/'} element={<Login />} />)
                <Route path={'/login'} element={<Login />} />)
                {/* <Route path={'/signup'} element={<SignUpPage />} />)
                            <Route path={'/forgot-password'} element={<ForgotPasswordPage />} />)
                            <Route path={'/epayment/:id'} element={<EPaymentPage />} />) */}
                <Route path={'*'} element={<ErrorPage />} />)
            </Routes>

        </div>

    );
};

export default PublicLayout;