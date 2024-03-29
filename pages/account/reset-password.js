import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [number, setNumber] = useState("");
  const forgotPassToken = useSelector((state) => state.user.forgotPassToken);

  const router = useRouter();
  const resetPassword = async () => {
    try {
      const res = await axios.post("/api/auth/reset-password", {
        token: forgotPassToken,
        password: password,
        number: number,
      });

      router.push("/account/login");
    } catch (error) {
      toast.success(error.response.data.error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      //   console.log(error);
      // console.log(error.response.data.error.message);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    resetPassword();
  };

  return (
    <>
      <Head>
        <title> Safefoods | Rest Password </title>
        <meta
          name="description"
          content="Safe Foods Agro Ltd. fights food adulteration & harmful effects. Founded in 2016, it's a social movement for safer daily consumption."
        />
        <link rel="icon" href="/assets/images/logo-safefoods.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="main">
        <ToastContainer />

        <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="index.html">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/account">Account</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                ResetPassword
              </li>
            </ol>
          </div>
          {/* End .container */}
        </nav>
        {/* End .breadcrumb-nav */}
        <div
          className="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17"
          style={{
            backgroundImage: 'url("assets/images/backgrounds/login-bg.jpg")',
          }}
        >
          <div className="container">
            <div className="form-box">
              <div className="form-tab">
                <h6>Reset Password</h6>
                <section className="entire-banner">
                  <h6 className="text-center mx-auto px-5">
                    Check your inbox for a{" "}
                    <span style={{ color: "crimson" }}>verification code</span>.
                    Put the code with along with your new password.
                  </h6>
                </section>
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="register-2"
                    role="tabpanel"
                    aria-labelledby="register-tab-2"
                  >
                    <form onSubmit={submitHandler}>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          placeholder="password"
                          name="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          className="form-control"
                          id="password"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          placeholder="Confirm Password"
                          name="passwordConfirmation"
                          value={passwordConfirmation}
                          onChange={(e) => {
                            setPasswordConfirmation(e.target.value);
                          }}
                          className="form-control"
                          id="passwordConfirmation"
                          required
                        />
                      </div>
                      {(passwordConfirmation.length > password.length ||
                        (password !== passwordConfirmation &&
                          passwordConfirmation.length === password.length)) && (
                        <p style={{ color: "brown", fontWeight: 600 }}>
                          Password do not match
                        </p>
                      )}
                      <div className="form-group">
                        <label htmlFor="number">Verification Code</label>
                        <input
                          type="text"
                          placeholder="Verification Code"
                          name="number"
                          value={number}
                          onChange={(e) => {
                            setNumber(e.target.value);
                          }}
                          className="form-control"
                          id="number"
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

export default ResetPassword;
