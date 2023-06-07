import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import jwt from 'jwt-decode';
import Timer from "@/components/auth/Timer";
import axios from "axios";

const VerifyAccount = () => {
  const [number, setNumber] = useState("");
  const [show, setShow] = useState(true);
  const [buttonText, setButtonText] = useState("Submit Verification Code");
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const token = useSelector((state) => state.user.signupToken);

  const email = token ? jwt(token).email : "";
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

    
  const submitHandler = (e) => {
    e.preventDefault();
    setButtonText("Wait...");
    axios
      .post("/api/auth/account-verification", {
        token,
        number,
      })
      .then(function (response) {
        //   console.log('success', response);
        setButtonText("Verified");
        setShow(false);
        setNumber("");
        router.push("/account/login");
        toast.success(response.data.message);
      })
      .catch(function (error) {
        //   console.log('error', error.response.data);
        setButtonText("Submit Verification Code");

        toast.error(error?.response?.data?.error);
      });
  };

  return (
    <>
      <ToastContainer />
      {!token && <p>First signup and then activate your account</p>}
      {token && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3>Activate Account</h3>

          <h4>
            We sent a verification code to your email address{" "}
            <span style={{ color: "crimson" }}>{email}</span> . It may take a
            few seconds for the code to arrive.{" "}
          </h4>
          <div>
            {/* <input value={number} onChange={(e)=>{setNumber(e.target.value)}} />  */}

            <input
              label="Verification Code"
              className="form-control"
              value={number}
              size="small"
              style={{ margin: "10px" }}
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
              <span>{buttonText}</span>
              <i className="icon-long-arrow-right" />
            </button>
          </div>
          {!show && (
            <Link href="/login">
              {/* <button className="btn btn-sm btn-warning">Login</button> */}
              <button 
              className="btn btn-outline-primary-2">
                Signin
              </button>
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

export default VerifyAccount;
