/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Loader from "@/components/Loader";
import { useDispatch } from "react-redux";
import { signupSuccess } from "@/store/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
const register = () => {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] =useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    response: "",
    buttonText: "sign up",
  });

  const { username, email, password, response, buttonText } = values;
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const signup = async () => {
    try {
      setValues({ ...values, buttonText: "Singing Up" });
      const response = await axios.post(
        "/api/auth/signup",
        { username, email, password }
      );
      dispatch(signupSuccess(response.data.token));
      setValues({
        ...values,
        username: "",
        email: "",
        password: "",
        buttonText: "sign up",
      });
  
      router.push("/account/verify-account");
      setIsLoading(false)
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setValues({
        ...values,
        response: error.response,
        buttonText: "sign up",
      });
      setIsLoading(false)
    }
  };
  
  const submitHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    signup();
  };
  return (
<>

<Head>
      <title>Safefoods|Register</title>
      <meta name="description" content = "Safefoods: For Your Family"/>
      <link rel="icon" href="/assets/images/logo-safefoods.png" />
    </Head>
<main className="main">
      <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
    
            <li className="breadcrumb-item active" aria-current="page">
              Register
            </li>
          </ol>
        </div>
        {/* End .container */}
      </nav>

      <div
        className="login-page bg-image pt-2 pb-2 pt-md-2 pb-md-2 pt-lg-2 pb-lg-2"
        style={{
          backgroundImage: `url("/assets/images/backgrounds/login-bg.jpg")`,
        }}
      >
        <div className="container">
          <div className="form-box">
            <div className="form-tab">
              <h6>Register</h6>
              <div className="tab-content">
                <div className="tab-pane fade show active">
                  <form onSubmit={submitHandler}>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        placeholder="Username"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        placeholder="Email"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {isLoading && <Loader />}

                    <div className="form-footer">
                      <button
                        type="submit"
                        className="btn btn-outline-primary-2"
                      >
                        <span>{buttonText}</span>
                        <i className="icon-long-arrow-right" />
                      </button>
                      <div className="custom-control ">
                      
                        <Link href="/account/login">Already a User!</Link> 

                    </div>
                      {/* End .custom-checkbox */}
                    </div>
                    {/* End .form-footer */}
                  </form>
                  {/* <div className="form-choice">
                  <p className="text-center">or sign in with</p>
                  <div className="row">
                    <div className="col-sm-6">
                      <a href="#" className="btn btn-login btn-g">
                        <i className="icon-google" />
                        Login With Google
                      </a>
                    </div>
                 
                    <div className="col-sm-6">
                      <a href="#" className="btn btn-login  btn-f">
                        <i className="icon-facebook-f" />
                        Login With Facebook
                      </a>
                    </div>
                  
                  </div>
               
                </div> */}
                  {/* End .form-choice */}
                </div>
                {/* .End .tab-pane */}
              </div>
              {/* End .tab-content */}
            </div>
            {/* End .form-tab */}
          </div>
          {/* End .form-box */}
        </div>
        {/* End .container */}
      </div>
      {/* End .login-page section-bg */}
    </main>
</>
  );
};

export default register;
