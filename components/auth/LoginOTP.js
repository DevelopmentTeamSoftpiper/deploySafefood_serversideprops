import { BsFillShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
    signInWithPhoneNumber,
    RecaptchaVerifier
  } from "firebase/auth";
import { auth } from "@/firebase.config";
import { toast, Toaster } from "react-hot-toast";
import { loginSuccess, providerSuccess } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { fetchDataFromApi, postDataToApi } from "@/utils/api";
import axios from "axios";

const LoginOTP = () => {

    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const router = useRouter();

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
              "recaptcha-container",
              {
                size: "invisible",
                callback: (response) => {
                  onSignup();
                },
                "expired-callback": () => {},
              },
              auth
            );
          }
    }

    async function onSignup() {
      setLoading(true);
      onCaptchVerify();
      const appVerifier = window.recaptchaVerifier;
  
      const formatPh = "+" + ph;
  
      await signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
         window.confirmationResult = confirmationResult;
          setLoading(false);
          setShowOTP(true);
          toast.success("OTP sent successfully!");
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  
    function onOTPVerify() {
      setLoading(true);
      window.confirmationResult
        .confirm(otp)
        .then(async (res) => {
          setUser(res?.user);
          const  {phoneNumber, accessToken ,uid} = res?.user;
          const firebaseUser = {uid, phoneNumber, accessToken};
          dispatch(loginSuccess(firebaseUser));
          dispatch(providerSuccess("firebase"));
          const userInfo = await fetchDataFromApi(
            `/api/profiles?populate=*&[filters][user_id_no][$eq]=${uid}`
          );
    
          // const res = await axios.get("/api/", {
          //   headers: {
          //     "Content-Type": "application/json",
          //     Accept: "application/json",
          //     token: `Bearer ${token}`,
          //   },
          // });
    
          if(userInfo?.data?.length ===0){
            const response = await postDataToApi("/api/profiles",
            {"data":{
              "phone": phoneNumber, 
              "user_id_no": uid,
              
            }} );
          }
        
          setLoading(false);
          toast.success("Login Sucessfully");
          const redirectPath = router.query.redirect || "/account";
          router.push(redirectPath);
        })
        .catch((err) => {
          setLoading(false);
        });
    }

    return (
        <>
    <section className="flex items-center justify-center">
 
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <>
            <h2 className="text-center text-white font-medium text-2xl">
              👍Login Success
            </h2>
          </>
        ) : (

          <div className="w-full flex flex-col gap-4 rounded-lg p-4">
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-primary text-center"
                >
                  Enter your OTP
                </label>

                <div className="form-group">
                    <input
                    type="text"
                    name="otp"
                    value={otp}
                    onChange={(e)=> setOtp(e.target.value)}
                    className="form-control"
                    required
                    />
                </div>

                <button
                  onClick={onOTPVerify}
                  className="bg-primary w-full flex gap-1 items-center justify-center py-1 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (

                <div>
                    <PhoneInput country={"bd"} value={ph} onChange={setPh} />
                    <button
                        onClick={onSignup}
                        className="bg-primary w-full flex gap-1 mt-1 items-center justify-center py-2.5 text-white rounded"
                        >
                        {loading && (
                        <CgSpinner size={20} className="mt-1 animate-spin" />
                        )}
                        <span>Send code via SMS</span>
                    </button>
                    <hr />
                </div>
            )}

          </div>
        )}
      </div>
    </section>
      </>
    )
}

export default LoginOTP;