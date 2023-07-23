import { fetchDataFromApi } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MobileMenuContainer = ({ showMenu, menuCloseHandler }) => {
  const [closeMenu, setCloseMenu] = useState(false);
  const showMenuHandler = () => {
    setCloseMenu(!closeMenu);
    menuCloseHandler({
      closeMenu: closeMenu,
    });
  };

  const [categories, setCategories] = useState(null);
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    const { data } = await fetchDataFromApi("/api/categories?populate=*");
    setCategories(data);
  };

  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");

  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    const { data } = await fetchDataFromApi("/api/products?populate=*");
    const productData = data.map((p) => ({
      title: p?.attributes?.title,
      price: p?.attributes?.price,
      slug: p?.attributes?.slug,
      url: p?.attributes?.image?.data?.[0]?.attributes?.url,
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
    <div
      className="mobile-menu-container"
      style={{
        visibility: "visible",
        transform: showMenu ? "translateX(280px)" : "translateX(0px)",
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
                    // onClick={() => {
                    //   showMenuHandler();
                    //   clearInputHandler();
                    // }}
                    onClick={showMenuHandler}
                  >
                    <Link
                      className="d-flex align-items-center"
                      href={`/product/${p?.slug}`}
                      // onClick={() => {
                      //   showMenuHandler();
                      //   clearInputHandler();
                      // }}
                    >
                      <Image
                        height={30}
                        width={30}
                        src={p?.url}
                        alt={p?.title}
                        priority={true}
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
              id="mobile-menu-link"
              data-toggle="tab"
              href="#mobile-menu-tab"
              role="tab"
              aria-controls="mobile-menu-tab"
              aria-selected="true"
            >
              Categories
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link font-size-normal second-primary-color font-weight-normal text-uppercase"
              id="mobile-cats-link"
              data-toggle="tab"
              href="#mobile-cats-tab"
              role="tab"
              aria-controls="mobile-cats-tab"
              aria-selected="false"
            >
              Menu
            </Link>
          </li>
        </ul>
        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            id="mobile-menu-tab"
            role="tabpanel"
            aria-labelledby="mobile-menu-link"
          >
            <nav className="mobile-nav">
              <ul className="mobile-menu">
                {categories?.map((c) => (
                  <li key={c?._id} className="active" onClick={showMenuHandler}>
                    <Link
                      href={`/category/${c?.attributes?.slug}`}
                      onClick={showMenuHandler}
                    >
                      {c?.attributes?.name}
                    </Link>
                    {c?.attributes?.sub_categories?.data?.length > 0 && (
                      <ul style={{ display: "block" }}>
                        {c?.attributes?.sub_categories?.data?.map((sub) => (
                          <Link
                            key={sub?._id}
                            href={`/subcategory/${sub?.attributes?.slug}`}
                            onClick={showMenuHandler}
                          >
                            <li>{sub?.attributes?.name}</li>
                          </Link>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            {/* End .mobile-nav */}
          </div>
          {/* .End .tab-pane */}
          <div
            className="tab-pane fade"
            id="mobile-cats-tab"
            role="tabpanel"
            aria-labelledby="mobile-cats-link"
          >
            <nav className="mobile-cats-nav">
              <ul className="mobile-cats-menu">
                <li>
                  <Link className="mobile-cats-lead" href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="mobile-cats-lead" href="/shop">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link className="mobile-cats-lead" href="/">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="mobile-cats-lead" href="/">
                    Private Policy
                  </Link>
                </li>
                <li>
                  <Link className="mobile-cats-lead" href="/">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
              {/* End .mobile-cats-menu */}
            </nav>
            {/* End .mobile-cats-nav */}
          </div>
          {/* .End .tab-pane */}
        </div>
        {/* End .tab-content */}

        {/* End .social-icons */}
      </div>
      {/* End .mobile-menu-wrapper */}
    </div>
  );
};

export default MobileMenuContainer;
