import Link from "next/link";
import React from "react";

const Banner1 = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="banner banner-rad mt-5">
            <div
              className="bg-image d-flex justify-content-center pt-4 pb-4 mb-4"
              style={{
                backgroundImage: "url(assets/images/demos/demo-26/bg-1.jpg)",
                width: "100%",
                height: "100%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className="banner-content position-relative pt-0">
                <h4 className="banner-subtitle letter-spacing-normal font-size-normal text-white text-center pt-0 mb-1">
                  <Link href="#">Discount</Link>
                </h4>
                {/* End .banner-subtitle letter-spacing-normal font-size-normal */}
                <h3 className="banner-title text-white text-center font-weight-bold mb-0">
                  <Link href="#">
                    New Lower Prices On Hundreds
                    <br /> Of Home Furnishings
                  </Link>
                </h3>
                {/* End .banner-title */}
                <h4 className="banner-text text-secondary text-center font-weight-light text-uppercase">
                  Sale Up 35% Off
                </h4>
              </div>
              {/* End .banner-content */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner1;
