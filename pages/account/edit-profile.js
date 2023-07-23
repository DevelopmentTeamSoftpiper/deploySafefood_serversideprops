/*eslint-disable */
import Loader from "@/components/Loader";
import { logout } from "@/store/userSlice";
import withAuth from "@/utils/restrict";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const router = useRouter();
  const user = useSelector((state) => state.user.currentUser);

  
  const provider = useSelector((state) => state.user.provider);
  const jwt = useSelector((state) => state.user.jwt);
  



  const getUserInfo = async () => {
   const userInfo =  await axios.post("/api/profile/find",
    {
      user_id_no: user._id,
    },
     {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        token: `Bearer ${jwt}`,
      },
      
    });

      setName(userInfo?.data?.name);
      setEmail(userInfo?.data?.email);
      setPhone(userInfo?.data?.phone);
      setAddress(userInfo?.data?.address);
      setPostalCode(userInfo?.data?.post_code);
      setCity(userInfo?.data?.city);
      setCountry(userInfo?.data?.country);
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  const profile = async () => {
    try {

      const updatedProfileData = await axios.post("/api/profile/update",
      {
        name: name,
        email: email,
        phone: phone,
        address: address,
        post_code: postalCode,
        city: city,
        country: country ? country : "Bangladesh",
        user_id_no: user._id,
      },
       {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          token: `Bearer ${jwt}`,
        },
        
      });
      toast.success("Profile Edited Successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setIsLoading(false);
    } catch (error) {
      toast.error("Something Went Wrong.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsLoading(false);
    }
  };

  const profileSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    profile();
  };

  const updatePassword = async () => {
    try {
      const res =await axios.post(
        "/api/auth/change-password",
        {
          id: user?._id,
          password: currentPassword,
          updatedPassword: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            token: `Bearer ${jwt}`,
          },
        }
      );
      toast.success("Password Updated Successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setPassword("");
      setCurrentPassword("");
      setPasswordConfirmation("");

    } catch (error) {
      toast.error("Something Went Wrong.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(error);
    }
  };

  const passwordChangeHandler = (e) => {
    e.preventDefault();
    updatePassword();
  };

  if (!user) {
    router.push("/account/login");
    return null;
  }

  const dispatch = useDispatch();
  return (
    <>
       <Head>
       <title>Safefoods | Account | Edit Profile</title>
  <meta name="description" content="Apyz Safe Foods Agro Ltd. is an agriculture based private company which started from 2016.Safe Foods is a social movement against adulteration  & harmful effect of different food items what we consume daily"/>
  <link rel="icon" href="/assets/images/logo-safefoods.png" />
  <meta property="og:url" content="https://safefoods.com.bd/account/edit-profile"/>
  <meta property="og:type" content="website"/>
  <meta property="og:title" content="Safefoods | Account | Edit Profile"/>
  <meta property="og:description" content="Apyz Safe Foods Agro Ltd. is an agriculture based private company which started from 2016.Safe Foods is a social movement against adulteration  & harmful effect of different food items what we consume daily"/>
  <meta property="og:image" content="https://res.cloudinary.com/dymnymsph/image/upload/v1687017637/safefoods/logo-safefoods_drdvz8.png"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta property="twitter:domain" content="safefoods.com.bd"/>
  <meta property="twitter:url" content="https://safefoods.com.bd/account/edit-profile"/>
  <meta name="twitter:title" content="Safefoods | Account | Edit Profile"/>
  <meta name="twitter:description" content="Apyz Safe Foods Agro Ltd. is an agriculture based private company which started from 2016.Safe Foods is a social movement against adulteration  & harmful effect of different food items what we consume daily"/>
  <meta name="twitter:image" content="https://res.cloudinary.com/dymnymsph/image/upload/v1687017637/safefoods/logo-safefoods_drdvz8.png"/>
    </Head>
        <main className="main">
      <ToastContainer />

      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Edit Account Information</h1>
        </div>
      </div>

      <div className="container">
        <div className="row d-flex justify-content-center p-5">
          {/* End .col-12 */}
          <div className="col-md-10">
            <ul className="nav nav-tabs nav-tabs-bg" id="tabs-1" role="tablist">
              <li className="nav-item">
                <Link
                  className="nav-link "
                  id="tab-1-tab"
                  data-toggle="tab"
                  href="/account"
                  role="tab"
                  aria-controls="tab-1"
                  aria-selected="true"
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  id="tab-2-tab"
                  data-toggle="tab"
                  href="/account/orders"
                  role="tab"
                  aria-controls="tab-2"
                  aria-selected="false"
                >
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link "
                  id="tab-3-tab"
                  data-toggle="tab"
                  href="/account/details"
                  role="tab"
                  aria-controls="tab-3"
                  aria-selected="false"
                >
                  Account Details
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  id="tab-4-tab"
                  data-toggle="tab"
                  href="/account/edit-profile"
                  role="tab"
                  aria-controls="tab-4"
                  aria-selected="false"
                >
                  Edit Profile
                </Link>
              </li>
              <li className="nav-item">
              <button
                  className="nav-link"
                  onClick={() => {
                    dispatch(logout());
                    toast.success("Signed Out Successfully", {
                      position: "top-right",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                   
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                      });
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
            <div className="tab-content tab-content-border" id="tab-content-1">
              <div
                className="tab-pane fade show active"
                id="tab-1"
                role="tabpanel"
                aria-labelledby="tab-1-tab"
              >
                <form onSubmit={profileSubmitHandler}>
                  <div className="row">
                    <div className="col-sm-6">
                      <label>Username <span style={{color:'red'}}>*</span> </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        required={true}
                        value={name}
                        onChange={(e) => {
                          return setName(e.target.value);
                        }}
                      />
                    </div>

                    <div className="col-sm-6">
                      <label>Email </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        
                        disabled={provider == "email-password"}
                        value={email}
                        onChange={(e) => {
                          return setEmail(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-12">
                      <label>Phone <span style={{color:'red'}}>*</span> </label>
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        required={true}
                        value={phone}
                        disabled={provider=="otp"}
                        onChange={(e) => {
                          return setPhone(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <label>Flat No, House No, Road No <span style={{color:'red'}}>*</span> </label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    required={true}
                    value={address}
                    onChange={(e) => {
                      return setAddress(e.target.value);
                    }}
                  />
                  <div className="row">
                    <div className="col-md-4">
                      <label>Postal Code </label>
                      <input
                        type="text"
                        name="postal_code"
                        className="form-control"
                       
                        value={postalCode}
                        onChange={(e) => {
                          return setPostalCode(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-4">
                      <label>District <span style={{color:'red'}}>*</span> </label>
                      <input
                        type="text"
                        name="city"
                        className="form-control"
                        required={true}
                        value={city}
                        onChange={(e) => {
                          return setCity(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-4">
                      <label>Country <span style={{color:'red'}}>*</span> </label>
                      <input
                        type="text"
                        name="country"
                        className="form-control"
                        required={true}
                        value={country}
                        onChange={(e) => {
                          return setCountry(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  {isLoading && <Loader />}

                  <button type="submit" className="btn btn-outline-primary-2">
                    <span>SAVE CHANGES</span>
                    <i className="icon-long-arrow-right" />
                  </button>
                </form>

              {
                provider === "email-password" && 
                
            (
              <>
              <h3 className="pt-2">Change Password:</h3>
              <form onSubmit={passwordChangeHandler}>
              <div className="row">
                <div className="col-sm-4">
                  <label>Current Password </label>
                  <input
                    type="password"
                    name="currentPassword"
                    className="form-control"
                    required=""
                    value={currentPassword}
                    onChange={(e) => {
                      return setCurrentPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="col-sm-4">
                  <label>Password </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    required=""
                    value={password}
                    onChange={(e) => {
                      return setPassword(e.target.value);
                    }}
                  />
                </div>

                <div className="col-sm-4">
                  <label>Confirmed Password </label>
                  <input
                    type="password"
                    name="passwordConfirmation"
                    className="form-control"
                    required=""
                    value={passwordConfirmation}
                    onChange={(e) => {
                      return setPasswordConfirmation(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
              {password !== passwordConfirmation && passwordConfirmation.length>0 && 
              <span style={{color:"brown", fontWeight:600}}>Passwords should be matched</span>}
              </div>
              {isLoading && <Loader />}

              <button type="submit" className="btn btn-outline-primary-2">
                <span>SAVE CHANGES</span>
                <i className="icon-long-arrow-right" />
              </button>
            </form>
            </>
            )
              }
              </div>
            </div>
            {/* End .tab-content */}
          </div>
          {/* End .col-md-6 */}

          {/* End .col-md-6 */}
        </div>
      </div>
    </main>
    </>

  );
};

export default withAuth(EditProfile);
