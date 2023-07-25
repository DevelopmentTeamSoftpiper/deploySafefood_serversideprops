import CustomHead from "@/components/CustomHead";
import { forgotPasswordSuccess } from "@/store/userSlice";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const forgetPassword = async () => {
    try {
      const res = await axios.post("/api/auth/forgot-password", {
        email,
      });
      dispatch(forgotPasswordSuccess(res.data.token));
      router.push("/account/reset-password");
    } catch (error) {
      console.log(error.response.data.error);
      toast.success(error.response.data.error, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    forgetPassword();
  };
  // console.log(email);
  return (
    <>
      <CustomHead
        title="Forgot Password"
        url="https://safefoods.com.bd/forget-password"
      />

      <main className="main">
        <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/account">Account</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                ForgetPassword
              </li>
            </ol>
          </div>
          {/* End .container */}
        </nav>
        {/* End .breadcrumb-nav */}
        <div
          className="login-page bg-image pt-8 pb-8 pt-md-3 pb-md-3 pt-lg-4 pb-lg-4"
          style={{
            backgroundImage: 'url("assets/images/backgrounds/login-bg.jpg")',
          }}
        >
          <div className="container">
            <div className="form-box">
              <div className="form-tab">
                <h6>Forget Password</h6>

                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="register-2"
                    role="tabpanel"
                    aria-labelledby="register-tab-2"
                  >
                    <form onSubmit={submitHandler}>
                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          placeholder="email"
                          onChange={handleChange}
                          name="email"
                          value={email}
                          className="form-control"
                          id="email"
                          required
                        />
                      </div>

                      <div className="form-footer">
                        <button
                          type="submit"
                          className="btn btn-outline-primary-2"
                        >
                          <span>Submit</span>
                          <i className="icon-long-arrow-right" />
                        </button>

                        {/* End .custom-checkbox */}
                      </div>
                      {/* End .form-footer */}
                    </form>

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

export default ForgetPassword;
