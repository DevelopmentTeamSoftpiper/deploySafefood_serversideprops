import Link from "next/link";
import React from "react";
import MainSwiper from "./MainSwiper";
import Image from "next/image";

const Hero = ({mainSlider, categories}) => {
  return (
    <div className="intro-section">
      <div className="container mt-2">
        <div className="row">
          <div className="col-lg-3 d-none d-lg-block">
            <nav className="side-nav">
              <div className="sidenav-title letter-spacing-normal font-size-normal d-flex justify-content-xl-between align-items-center bg-primary justify-content-center text-truncate">
                Browse Categories
                <i className="icon-bars float-right h5 text-white m-0 d-none d-xl-block" />
              </div>
              {/* End .sidenav-title   font-size-normal */}
              <ul
                className="menu-vertical sf-arrows sf-js-enabled"
                style={{ touchAction: "pan-y", height:"350px" }}
              >
                {categories?.map((c) => (
                  <li key={c._id} className="megamenu-container">
                    <Link
                      className={
                        c?.subCategories?.length > 0
                          ? "sf-with-ul text-dark d-flex"
                          : "text-dark d-flex"
                      }
                      href={`/category/${c?.slug}`}
                    >
                      <Image
                        height={20}
                        width={20}
                        src={c?.image}
                        alt={c?.name}
                      />
                      {c?.name}
                    </Link>
                    {c?.subCategories?.length > 0 && (
                      <div className="megamenu">
                        <div className="row ">
                                <div className="col-md-12">
                                  <ul>
                                    {c?.subCategories?.map(
                                      (sub) => (
                                        <li key={sub?._id}>
                                          <Link
                                            href={`/subcategory/${sub?.slug}`}
                                          >
                                            {sub?.name}
                                          </Link>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="col-lg-9 col-md-9 col-12 mb-md-0 mb-2">
             <MainSwiper mainSlider={mainSlider} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
