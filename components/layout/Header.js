import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/userSlice";
import Search from "./Search";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase.config";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { FiUserPlus } from "react-icons/fi";
import { FiUserCheck } from "react-icons/fi";

import axios from "axios";

const Header = ({ siteInfo }) => {
  
  const router = useRouter();
  const user = useSelector((state) => state.user.currentUser);
  const provider = useSelector((state) => state.user.provider);

  const dispatch = useDispatch();

  const logOut = async () => {
    dispatch(logout());
    if (provider === "firebase") {
      await signOut(auth);
    }
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

  //menu tab
  const [tab, setTab] = useState("category");
  

  // mobile menu
  const [closeMenu, setCloseMenu] = useState(false);
  const showMenuHandler = () => {
    setCloseMenu(!closeMenu);
  };

  const [categories, setCategories] = useState(null);
  const fetchCategories = async () => {
    const {data} = await axios.get("/api/admin/category/getAll");
    setCategories(data);
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);

  

  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");
  const [showAccount, setShowAccount] = useState(false);
  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    const { data } = await axios.get("/api/admin/product/getAll");
    
    const productData = data.products.map((p) => ({
      title: p?.title,
      price: p?.price,
      slug: p?.slug,
      url: p?.image,
    }));

    setProducts(productData);
  };
  const filterChangeHandler = (e) => {
    const searchedWord = e.target.value;
    setQuery(searchedWord);
    const newFilter = products.filter((value) => {
      return value.title.toLowerCase().includes(searchedWord.toLowerCase());
    });
    if (query === "") {
      setFilterData([]);
    } else {
      setFilterData(newFilter);
    }
  };



  const clearInputHandler = () => {
    setQuery("");
    setFilterData([]);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <ToastContainer />
      <header className="header header-intro-clearance header-26" style={{position:"sticky", top:0}}>
        {/* End .header-top */}
        <div className="header-middle">
          <div className="container">
            <div className="header-left" style={{paddingLeft:"20px",justifyContent:"center", maxHeight:"90px"}}>
              <button className="mobile-menu-toggler" onClick={showMenuHandler}>
                <span className="sr-only">Toggle mobile menu</span>
                <i className="icon-bars" />
              </button>
              <Link href="/" className="logo">
                <Image
                  src="/assets/images/logo-safefoods.png"
                  alt="safefoods Logo"
                  width={65}
                  height={85}
                />
              </Link>
            </div>
            {/* End .header-left */}
            <Search />

            <div className="header-right">
              <div className="header-dropdown-link">
                <ul className="top-menu">
                  <li>
                    {/* <Link href={user? "#": "/account/login"} className='' style={{backgroundColor: "#61AB00",color:"white", padding:"10px"}}>{user? "Account" : "Login/Register"}</Link> */}

                    <div className="header-dropdown">
                      <Link
                        href={user ? "#" : "/account/login"}
                        className=""
                        style={{
                         
                          minWidth: "100px",
                          paddingRight: "17px",
                      
                        }}
                        onClick={()=>{setShowAccount(true)}}
                        onMouseOver={()=>{setShowAccount(true)}}
                        onMouseLeave={()=>{setShowAccount(false)}}
                      >
                        {user ? (
                          <li style={{fontSize:"13px", backgroundColor:"#61AB00",padding:"5px", color:"white"}}>
                            Account                           
                          </li>
                        ) : (
                          <li className="d-flex">
                            <Link href="/account/login" className="text-dark">
                              <FiUserCheck
                                style={{ fontSize: "21px", color: "black" }}
                              />{" "}
                              /
                            </Link>
                            <Link
                              href="/account/register"
                              className="text-dark"
                            >
                              <FiUserPlus
                                style={{ fontSize: "21px", color: "black" }}
                              />
                            </Link>
                          </li>
                        )}
                      </Link>

                      {user && (
                        <div className="header-menu"
                        style={showAccount? {visibility:"visible", opacity: 1} : {visibility: "hidden", opacity: 0} }
                        onMouseOver={()=>{setShowAccount(true)}}
                        onMouseLeave={()=>{setShowAccount(false)}}>
                          
                          <ul>
                            <li>
                              <Link href="/account/details">
                                Account Details
                              </Link>
                            </li>
                            <li>
                              <Link href="/account/edit-profile">
                                Edit Profile
                              </Link>
                            </li>
                            <li>
                              <Link href="/account/orders">Orders</Link>
                            </li>
                            <li>
                              <button
                                style={{ paddingLeft: "15px" }}
                                onClick={() => {
                                  logOut();
                                }}
                              >
                                Logout
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                      {/* End .header-menu */}
                    </div>

                    {/* <li>
                  <a href="#signin-modal" data-toggle="modal">
                    Sign in / Sign up
                  </a>
                </li> */}
                  </li>
                </ul>
                <Cart />
              </div>
            </div>
            {/* End .header-right */}
          </div>
          {/* End .container */}
        </div>
        {/* End .header-middle */}
        <div className="header-bottom sticky-header">
          <div className="container d-flex justify-center">
            <div className="">
              <nav className="main-nav">
                <ul className="menu sf-arrows">
                  <li className={router.pathname === "/" ? "active" : ""}>
                    <Link href="/">Home</Link>
                  </li>
                  <li className={router.pathname === "/shop" ? "active" : ""}>
                    <Link href="/shop">Shop</Link>
                  </li>
                  <li className={router.pathname === "/about" ? "active" : ""}>
                    <Link href="/about">About</Link>
                  </li>
                  <li className={router.pathname === "/blogs" ? "active" : ""}>
                    <Link href="/blogs">Blogs</Link>
                  </li>
                  <li
                    className={
                      router.pathname === "/private-policy" ? "active" : ""
                    }
                  >
                    <Link href="/private-policy">Private Policy</Link>
                  </li>
                  <li
                    className={
                      router.pathname === "/returns-refund" ? "active" : ""
                    }
                  >
                    <Link href="/returns-refund">Refund & Returns</Link>
                  </li>
                  <li
                    className={
                      router.pathname === "/terms-and-conditions"
                        ? "active"
                        : ""
                    }
                  >
                    <Link href="/terms-and-conditions">Terms & Conditions</Link>
                  </li>
                  <li
                    className={router.pathname === "/contact" ? "active" : ""}
                  >
                    <Link href="/contact">Contact</Link>
                  </li>

                  {/* <li>
                <a href="blog.html" className="sf-with-ul">
                  Blog
                </a>
                <ul>
                  <li>
                    <a href="blog.html">Classic</a>
                  </li>
                  <li>
                    <a href="blog-listing.html">Listing</a>
                  </li>
                  <li>
                    <a href="#">Grid</a>
                    <ul>
                      <li>
                        <a href="blog-grid-2cols.html">Grid 2 columns</a>
                      </li>
                      <li>
                        <a href="blog-grid-3cols.html">Grid 3 columns</a>
                      </li>
                      <li>
                        <a href="blog-grid-4cols.html">Grid 4 columns</a>
                      </li>
                      <li>
                        <a href="blog-grid-sidebar.html">Grid sidebar</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Masonry</a>
                    <ul>
                      <li>
                        <a href="blog-masonry-2cols.html">Masonry 2 columns</a>
                      </li>
                      <li>
                        <a href="blog-masonry-3cols.html">Masonry 3 columns</a>
                      </li>
                      <li>
                        <a href="blog-masonry-4cols.html">Masonry 4 columns</a>
                      </li>
                      <li>
                        <a href="blog-masonry-sidebar.html">Masonry sidebar</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Mask</a>
                    <ul>
                      <li>
                        <a href="blog-mask-grid.html">Blog mask grid</a>
                      </li>
                      <li>
                        <a href="blog-mask-masonry.html">Blog mask masonry</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Single Post</a>
                    <ul>
                      <li>
                        <a href="single.html">Default with sidebar</a>
                      </li>
                      <li>
                        <a href="single-fullwidth.html">Fullwidth no sidebar</a>
                      </li>
                      <li>
                        <a href="single-fullwidth-sidebar.html">
                          Fullwidth with sidebar
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li> */}
                </ul>
                {/* End .menu */}
              </nav>
              {/* End .main-nav */}
            </div>
            {/* End .header-center */}
            {/* <div className="header-right">
          <i className="la la-lightbulb-o" />
          <p className="text-dark">Clearance Up to 30% Off</p>
        </div> */}
          </div>
          {/* End .container */}
        </div>
        {/* End .header-bottom */}
      </header>
      {/* <MobileMenuOverlay
        showMenu={showMenu}
        menuCloseHandler={menuCloseHandler}
      /> */}
      {/* <MobileMenuContainer
        showMenu={showMenu}
        menuCloseHandler={menuCloseHandler}
      /> */}

      {/* Mobile Menu overlay */}

      <div
        className="mobile-menu-overlay"
        style={{
          visibility: closeMenu ? "visible" : "",
          opacity: closeMenu ? 1 : 0,
        }}
        onClick={showMenuHandler}
      ></div>
      {/* Mobile Menu Container */}
      <div
        className="mobile-menu-container"
        style={{
          visibility: "visible",
          transform: closeMenu ? "translateX(280px)" : "translateX(0px)",
        }}
      >
        <div className="mobile-menu-wrapper">
          <span className="mobile-menu-close" onClick={showMenuHandler}>
            <i className="icon-close" />
          </span>
          <div style={{ position: "relative", marginBottom: "2rem" }}>
            <div className="d-flex align-items-center justify-content-between">
              <input
                type="search"
                className="form-control"
                style={{ marginBottom: "0rem" }}
                name="mobile-search"
                id="mobile-search"
                placeholder="Search in..."
                required=""
                value={query}
                onChange={filterChangeHandler}
              />
              <button
                className="btn btn-primary btn-sm"
                style={{ minWidth: "30px" }}
                type="submit"
              >
                <i className="icon-search" />
              </button>
            </div>

            {filterData.length !== 0 && query.length > 1 && (
              <div
                style={{
                  position: "absolute",
                  top: 46,
                  left: 0,
                  zIndex: 100,
                  width: "100%",
                  backgroundColor: "whitesmoke",
                }}
              >
                <ul
                  className="menu-vertical sf-arrows sf-js-enabled"
                  style={{ touchAction: "pan-y" }}
                >
                  {filterData?.map((p) => (
                    <li
                      key={p?._id}
                      className="megamenu-container"
                      onClick={() => {
                        showMenuHandler();
                        clearInputHandler();
                      }}
                      // onClick={showMenuHandler}
                    >
                      <Link
                        className="d-flex align-items-center"
                        href={`/product/${p?.slug}`}
                        onClick={() => {
                          showMenuHandler();
                          clearInputHandler();
                        }}
                      >
                        <Image
                          height={30}
                          width={30}
                          src={p?.url}
                          alt={p?.title}
                        />
                        <span className="d-flex align-items-center">
                          {p?.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <ul className="nav nav-pills-mobile" role="tablist">
            <li className="nav-item">
              <Link
                className="nav-link font-size-normal second-primary-color font-weight-normal text-uppercase active"
                // id="mobile-menu-link"
                // data-toggle="tab"
                href="#"
                // role="tab"
                // aria-controls="mobile-menu-tab"
                // aria-selected="true"
                onClick={() => {
                  setTab("category");
                }}
              >
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link font-size-normal second-primary-color font-weight-normal text-uppercase"
                // id="mobile-cats-link"
                // data-toggle="tab"
                href="#"
                // role="tab"
                // aria-controls="mobile-cats-tab"
                // aria-selected="false"
                onClick={() => {
                  setTab("menu");
                }}
              >
                Menu
              </Link>
            </li>
          </ul>
          <div className="tab-content">
            {tab === "category" && (
              <div
                className="tab-pane  show "
                style={{ display: "block" }}
                // id="mobile-menu-tab"
                // role="tabpanel"
                // aria-labelledby="mobile-menu-link"
              >
                <nav className="mobile-nav">
                  <ul className="mobile-menu">
                    {categories?.categories?.map((c) => (
                      <li
                        key={c?._id}
                        className="active"
                        onClick={showMenuHandler}
                      >
                        <Link
                          href={`/category/${c?.slug}`}
                          onClick={showMenuHandler}
                        >
                          {c?.name}
                        </Link>
                        {c?.subCategories?.length > 0 && (
                          <ul style={{ display: "block" }}>
                            {c?.subCategories?.map((sub) => (
                              <li key={sub?._id}>
                                <Link
                                  href={`/subcategory/${sub?.slug}`}
                                  onClick={showMenuHandler}
                                >
                                  {sub?.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            {tab === "menu" && (
              <div
                className="tab-pane  show"
                style={{ display: "block" }}
                // id="mobile-cats-tab"
                // role="tabpanel"
                // aria-labelledby="mobile-cats-link"
              >
                <nav className="mobile-cats-nav">
                  <ul className="mobile-cats-menu">
                    <li onClick={showMenuHandler}>
                      <Link className="mobile-cats-lead" href="/">
                        Home
                      </Link>
                    </li>
                    <li onClick={showMenuHandler}>
                      <Link className="mobile-cats-lead" href="/shop">
                        Shop
                      </Link>
                    </li>
                    <li onClick={showMenuHandler}>
                      <Link className="mobile-cats-lead" href="/blogs">
                        Blogs
                      </Link>
                    </li>
                    <li onClick={showMenuHandler}>
                      <Link className="mobile-cats-lead" href="/about">
                        About
                      </Link>
                    </li>
                    <li onClick={showMenuHandler}>
                      <Link className="mobile-cats-lead" href="/private-policy">
                        Private Policy
                      </Link>
                    </li>
                    <li onClick={showMenuHandler}>
                      <Link className="mobile-cats-lead" href="/returns-refund">
                        Refund & Returns
                      </Link>
                    </li>
                    <li onClick={showMenuHandler}>
                      <Link
                        className="mobile-cats-lead"
                        href="/terms-and-conditions"
                      >
                        Terms & Conditions
                      </Link>
                    </li>
                    <li onClick={showMenuHandler}>
                      <Link className="mob ile-cats-lead" href="/contact">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                  {/* End .mobile-cats-menu */}
                </nav>
              </div>
            )}
          </div>
          {/* End .tab-content */}

          {/* End .social-icons */}
        </div>
        {/* End .mobile-menu-wrapper */}
      </div>
      {/* <AuthModal/> */}
    </>
  );
};

export default Header;
