/* eslint-disable */
import CustomHead from "@/components/CustomHead";
import Loader from "@/components/Loader";
import GoogleReCaptcha from "@/helpers/GoogleReCaptcha";
import {
  jwtSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  providerSuccess,
  signupSuccess,
} from "@/store/userSlice";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [toggleProvider, setToggleProvider] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [valid, setValid] = useState(false);
  const [captcha, setCaptcha] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    emailId: "",
    password: "",
    response: "",
    buttonText: "Sign in",
  });
  const { emailId, password, response, buttonText } = values;
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //Login Handler
  const login = async () => {
    try {
      setIsLoading(true);
      setValues({ ...values, buttonText: "Singing in" });
      const res = await axios.post("/api/auth/signin", {
        emailId,
        password,
        captcha,
      });

      dispatch(loginSuccess(res.data.user));
      dispatch(jwtSuccess(res.data.token));
      dispatch(providerSuccess("email-password"));

      await axios.post(
        "/api/profile/store",
        {
          email: res.data.user.email,
          user_id_no: res.data.user._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            token: `Bearer ${res.data.token}`,
          },
        }
      );

      const redirectPath = router.query.redirect || "/account";
      router.push(redirectPath);
      setIsLoading(false);
      setCaptcha(null);
    } catch (error) {
      setValues({
        ...values,
        response: "Invalid Email or Password",
        buttonText: "Sign In Again",
      });
      dispatch(loginFailure());
      toast.error(error.response.data.error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsLoading(false);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!captcha) return;
    login();
  };

  useEffect(() => {
    const regex = /^0[0-9]{10}$/;
    const isValid = regex.test(phone);
    setValid(isValid);
  }, [phone]);
  const otpLogin = async () => {
    try {
      setIsLoading(true);
      if (!valid) {
        setIsLoading(false);
        return toast.error("Enter a valid phone no", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }

      const res = await axios.post("/api/auth/otp-login", {
        phone,
        captcha,
      });
      dispatch(signupSuccess(res?.data?.token));

      setCaptcha(null);
      router.push("/account/otp-verification");
      setIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong. Try again", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsLoading(false);
    }
  };

  const otpSubmitHandler = (e) => {
    e.preventDefault();
    if (!captcha) return;
    otpLogin();
  };
  return (
    <>
      <CustomHead
        title="Safefoods | Login"
        url="https://safefoods.com.bd/account/login"
      />
      <main className="main">
        <ToastContainer />

        <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="#">Pages</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Login
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
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="register-2"
                    role="tabpanel"
                    aria-labelledby="register-tab-2"
                  >
                    <div>
                      <p className="text-center uppercase text-accent text-3xl text-black fs-bold">
                        sign in with {toggleProvider ? "EMAIL" : "OTP"}
                      </p>
                    </div>

                    {toggleProvider ? (
                      <form onSubmit={submitHandler}>
                        <div className="form-group">
                          <label htmlFor="email">Email Address</label>
                          <input
                            type="email"
                            placeholder="email"
                            onChange={handleChange}
                            name="emailId"
                            value={emailId}
                            className="form-control"
                            id="emailId"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <input
                            type="password"
                            placeholder="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="form-control"
                            id="password"
                            required
                          />
                        </div>

                        {isLoading && <Loader />}

                        <GoogleReCaptcha setValue={setCaptcha} />

                        <div className="form-footer">
                          <button
                            type="submit"
                            disabled={!captcha || !emailId || !password}
                            className="btn btn-outline-primary-2"
                          >
                            <span>{buttonText}</span>
                            <i className="icon-long-arrow-right" />
                          </button>

                          <div className="custom-control ">
                            <Link
                              href="/account/forget-password"
                              style={{ marginRight: "10px" }}
                            >
                              Forget Password!
                            </Link>
                            <Link href="/account/register">Not a User!</Link>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <form onSubmit={otpSubmitHandler}>
                        <div className="form-group d-flex justify-center align-middle mt-3">
                          {/* <label htmlFor="email" style={{alignContent:"center",paddingRight:"20px"}}>Mobile No</label> */}

                          <input
                            type="text"
                            value="+88"
                            className="form-control"
                            disabled
                            style={{ width: "70px" }}
                          />
                          <input
                            type="text"
                            onChange={(e) => {
                              setPhone(e.target.value);
                            }}
                            name="phone"
                            value={phone}
                            className="form-control"
                            id="phone"
                            required
                            style={{ width: "200px" }}
                          />
                        </div>

                        {isLoading && <Loader />}
                        <div style={{ marginLeft:"70px"}}>
                          <GoogleReCaptcha setValue={setCaptcha} />
                        </div>

                        <div
                          className="form-footer"
                          style={{ justifyContent: "center" }}
                        >
                          <button
                            disabled={!captcha || !phone}
                            type="submit"
                            className="btn btn-outline-primary-2"
                          >
                            <span>Send OTP</span>
                            <i className="icon-long-arrow-right" />
                          </button>
                        </div>
                      </form>
                    )}

                    <div
                      style={{ textAlign: "center" }}
                      className="d-flex justify-center"
                    >
                      {!toggleProvider ? (
                        <div className="row">
                          <div className="col-sm-12">
                            <button
                              className="btn btn-login btn-g"
                              style={{
                                color: "black",
                                fontWeight: 600,
                                border: "1px solid black",
                              }}
                              onClick={(e) =>
                                setToggleProvider(!toggleProvider)
                              }
                            >
                              <i className="icon-long-arrow-right" />
                              Login With EMAIL
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="row">
                          <div className="col-sm-12">
                            <button
                              className="btn btn-login btn-g "
                              style={{
                                color: "black",
                                fontWeight: 600,
                                border: "1px solid black",
                              }}
                              onClick={(e) =>
                                setToggleProvider(!toggleProvider)
                              }
                            >
                              <i className="icon-long-arrow-right" />
                              Login With MOBILE
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
