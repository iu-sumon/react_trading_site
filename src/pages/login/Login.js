 import React from 'react';
 import Button from 'react-bootstrap/Button';
 import logo from '../../assets/broker-logo-light.png'
 import './Login.css'


 const Login = () => {

    return (
    <section className="login_page_container">
        <div className="container-fluid">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-3 mt-5">
                    <div className="card text-white" style={{ borderRadius: "1rem", backgroundColor: "#000000", border: "1px solid rgba(108, 156, 230, .5)" }}>
                        <div className="card-body">
                            <div className="mb-md-2">
                                <img src={logo} alt="" width={200} height={50}/>
                                <h6 className="fw-bold mb-1">Welcome Back !</h6>
                                <p className="text-white-50">Please login to continue</p>

                                <form>
                                    <div className="form-outline mb-3">
                                        <input type="email" id="" placeholder='username' className="form-control" required />
                                    </div>

                                    <div className="form-outline mb-3">
                                        <input type="password" id="" placeholder='password' className="form-control" required />
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                      <p className="small text-white-50"> <input type="checkbox" /> Remember Me</p>
                                      <p className="small"><a className="text-danger" href="#!">Forgot password?</a></p> 
                                    </div> 
                                    <Button className="px-5"  type="submit" variant="outline-primary">Login</Button>
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