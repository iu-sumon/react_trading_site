import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import { Card, Col, Row } from "antd";
import '../assets/auth.css';
import LoginPage from "../pages/auth/login";
import SignUpPage from "../pages/auth/signUp";
import ForgotPasswordPage from "../pages/auth/forgot-password";
import EPaymentPage from "../pages/ePayment";
import ErrorPage from "../pages/error/errorPage";

const PublicLayout = () => {

    useEffect(() => {
        /* const token = Cookies.get("_jwtToken");
         if (token) {
             window.location = "/login";
         }*/
    }, [])

    return (
        <div>
            <Row justify="center" align="middle" style={{ marginTop: '100px' }}>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                    <Card>
                        <Routes>
                            <Route path={'/'} element={<LoginPage />} />)
                            <Route path={'/login'} element={<LoginPage />} />)
                            <Route path={'/signup'} element={<SignUpPage />} />)
                            <Route path={'/forgot-password'} element={<ForgotPasswordPage />} />)
                            <Route path={'/epayment/:id'} element={<EPaymentPage />} />)
                            <Route path={'*'} element={<ErrorPage />} />)
                        </Routes>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default PublicLayout;