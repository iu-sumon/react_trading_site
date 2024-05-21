import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import logo from '../../assets/broker-logo-light.png'
import './Login.css'
import { Link, useNavigate } from "react-router-dom";
import adminServer, { setCookiesFromAuthResponse } from "../../utilities/server/adminServer";
import errorHandler from "../../utilities/errorHandler";
import { API_LOGIN } from "../../utilities/apiRequest/auth";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../slices/userSlice';



const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user.isLoggedIn) {
            navigate('/dashboard');
        }
    }, [user]);

    const [credentials, setCredential] = useState({
        username: '',
        password: ''
    });

    const [isLoading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredential({ ...credentials, [name]: value }); // Spread operator for state update
    };



    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const formdata = new FormData();
        formdata.append("username", credentials.username);
        formdata.append("password", credentials.password);
        formdata.append("user_device", "Desktop");

        adminServer.post("https://omsapi.quantbd.com/auth/login/", formdata).then((res) => {
            setLoading(false);
            setCookiesFromAuthResponse(res);
            dispatch(login, res);
            navigate('/dashboard');
        }).catch((err) => {
            console.log(err.response);
            errorHandler(err);
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <section className="login_page_container">
            <div className="container-fluid">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-3 mt-5">
                        <div className="card text-white" style={{ borderRadius: "1rem", backgroundColor: "#000000", border: "1px solid rgba(108, 156, 230, .5)" }}>
                            <div className="card-body">
                                <div className="mb-md-2">
                                    <img src={logo} alt="" width={200} height={50} />
                                    <h6 className="fw-bold mb-1">Welcome Back !</h6>
                                    <p className="text-white-50">Please login to continue</p>

                                    <form method='POST' onSubmit={onSubmit}>
                                        <div className="form-outline mb-3">
                                            <input type="text" id="" placeholder='name' value={credentials.username}
                                                onChange={handleChange} name='username' className="form-control" required />
                                        </div>

                                        <div className="form-outline mb-3">
                                            <input type="password" id="" name='password' placeholder='password' value={credentials.password}
                                                onChange={handleChange} className="form-control" required />
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <p className="small text-white-50"> <input type="checkbox" /> Remember Me</p>
                                            <p className="small"><a className="text-danger" href="#!">Forgot password?</a></p>
                                        </div>
                                        <Button className="px-5" type="submit" variant="outline-primary" >{isLoading ? 'trying' : 'Login'}</Button>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;