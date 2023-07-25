/*eslint-disable */
import CustomHead from "@/components/CustomHead";
import { logout } from "@/store/userSlice";
import { fetchDataFromApi } from "@/utils/api";
import withAuth from "@/utils/restrict";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const index = () => {
  const [userInfo, setUserInfo] = useState(null);
  const jwt = useSelector((state) => state.user.jwt);
  const router = useRouter();
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const getUserInfo = async () => {
    const userInfo = await axios.post(
      "/api/profile/find",
      {
        user_id_no: user._id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          token: `Bearer ${jwt}`,
        },
      }
    );

    setUserInfo(userInfo);
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  if (!user) {
    router.push("/account/login");
    return null;
  }
  const logOut = async () => {
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
  };

  return (
    <>
      <CustomHead
        title="My Account"
        url="https://safefoods.com.bd/account/account"
      />

      <main className="main">
        <ToastContainer />
        <div
          className="page-header text-center"
          style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
        >
          <div className="container">
            <h1 className="page-title">
              My Account
              <span>
                Welcome! {userInfo?.data?.name ? userInfo?.data?.name : ""}{" "}
              </span>
            </h1>
          </div>
        </div>

        <div className="container">
          <div className="row d-flex justify-content-center p-5">
            {/* End .col-12 */}
            <div className="col-md-10">
              <ul
                className="nav nav-tabs nav-tabs-bg"
                id="tabs-1"
                role="tablist"
              >
                <li className="nav-item">
                  <Link
                    className="nav-link active"
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
                    className="nav-link"
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
                    className="nav-link"
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
                      logOut();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
              <div
                className="tab-content tab-content-border"
                id="tab-content-1"
              >
                <div
                  className="tab-pane fade show active"
                  id="tab-1"
                  role="tabpanel"
                  aria-labelledby="tab-1-tab"
                >
                  <p>
                    Hello{" "}
                    <span className="font-weight-normal text-dark">
                      {userInfo?.data?.name ? userInfo?.data?.name : "User"}
                    </span>{" "}
                    (not{" "}
                    <span className="font-weight-normal text-dark">
                      {userInfo?.data?.name ? userInfo?.data?.name : "User"}
                    </span>
                    ?{" "}
                    <button
                      style={{ color: "red", fontWeight: 600 }}
                      onClick={() => {
                        dispatch(logout());
                      }}
                    >
                      Log out
                    </button>
                    )
                    <br />
                    From your account dashboard you can view your{" "}
                    <Link
                      href="/account/orders"
                      className="tab-trigger-link link-underline"
                    >
                      recent orders
                    </Link>
                    , manage your shipping and billing addresses, and{" "}
                    <Link
                      href="/account/edit-profile"
                      className="tab-trigger-link"
                    >
                      edit account details
                    </Link>
                    .
                  </p>
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

export default withAuth(index);
