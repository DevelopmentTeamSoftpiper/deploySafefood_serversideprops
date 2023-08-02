import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import jwt from "jwt-decode";
import Timer from "@/components/auth/Timer";
import axios from "axios";
import {
  jwtSuccess,
  loginFailure,
  loginSuccess,
  providerSuccess,
} from "@/store/userSlice";
import Head from "next/head";

const OtpVerification = () => {
  const [number, setNumber] = useState("");
  const [show, setShow] = useState(true);
  const [buttonText, setButtonText] = useState("Submit Verification Code");
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const token = useSelector((state) => state.user.signupToken);
  const phone = token ? jwt(token).phone : "";
  // console.log(phone);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const timer = new Timer(
      timeLeft * 1000,
      (remainingTime) => {
        setTimeLeft(Math.round(remainingTime));
      }
      // () => {
      //   alert('Time is up!');
      // }
    );

    timer.start();

    return () => {
      timer.stop();
    };
  });

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const login = async () => {
    try {
      const res = await axios.post("/api/auth/otp-verification", {
        token,
        number,
        mobile: phone,
      });

      dispatch(loginSuccess(res.data.user));
      dispatch(jwtSuccess(res.data.token));
      dispatch(providerSuccess("otp"));

      await axios.post(
        "/api/profile/store",
        {
          phone: res.data.user.phone,
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

      const redirectPath = router.query.redirect || "/account/details";
      router.push(redirectPath);
    } catch (error) {
      // console.log(error.response.data.error);

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
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <>
       <Head>
        <title> Safefoods | OTP Verification </title>
        <meta
          name="description"
          content="Safe Foods Agro Ltd. fights food adulteration & harmful effects. Founded in 2016, it's a social movement for safer daily consumption."
        />
        <link rel="icon" href="/assets/images/logo-safefoods.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <ToastContainer />
      {!token && <p>First Login with OTP and try again.</p>}
      {token && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <h3>Verify OTP</h3>

          <h6>
            We sent a verification code to your Mobile No . It may take a few
            seconds for the code to arrive. Submit the code within 5 minutes to
            verify.{" "}
          </h6>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
            }}
          >
            {/* <input value={number} onChange={(e)=>{setNumber(e.target.value)}} />  */}

            <input
              label="Verification Code"
              className="form-control"
              value={number}
              size="small"
              style={{ margin: "10px", borderColor: "black" }}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
            <br />
            {/* <button className="btn btn-sm btn-warning" disabled={!show} onClick={submitHandler}>{buttonText}</button> */}
            <button
              type="submit"
              className="btn btn-outline-primary-2"
              disabled={!show}
              onClick={submitHandler}
            >
              <span>Submit OTP</span>
              <i className="icon-long-arrow-right" />
            </button>
          </div>
          {!show && (
            <Link href="/login">
              {/* <button className="btn btn-sm btn-warning">Login</button> */}
              <button className="btn btn-outline-primary-2">Signin</button>
            </Link>
          )}
          <div>
            <p>{formattedTime}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default OtpVerification;
