import React from 'react';

const HomeService = () => {
    return (
        <div className="container icon-boxes-section d-none d-lg-block">
                <div className="icon-boxes-container py-4 bg-lighter mb-2 mt-2">
                    <div className="owl-carousel carousel-simple owl-theme carousel-equal-height shadow-carousel row cols-1 cols-md-2 cols-lg-3 cols-xl-4"
                        data-toggle="owl" data-owl-options='{
                        "dots": true,
                        "nav": false, 
                        "loop": false,
                        "margin": 13,
                        "responsive": {
                            "0": {
                                "items": 1
                            },
                            "575": {
                                "items": 2
                            },
                            "992": {
                                "items": 3
                            },
                            "1200": {
                                "items": 4
                            }
                        }
                    }'>
                        <div className="icon-box mb-0 d-md-flex align-items-md-center text-center text-md-left mx-md-0 mx-auto">
                            <span className="icon-box-icon mb-0">
                                <i className="icon-truck py-2 pt-0 second-primary-color"></i>
                            </span>
                            <div className="icon-box-content">
                                <h3 className="icon-box-title font-size-normal mb-0 font-weight-bold text-uppercase second-primary-color">Payment &amp; Delivery</h3>
                                <p className="font-weight-light second-primary-color">Pay Cash on Delivery and Online</p>
                            </div>
                        </div>
                        <div className="icon-box mb-0 d-md-flex align-items-md-center text-center text-md-left mx-md-0 mx-auto">
                            <span className="icon-box-icon text-dark mb-0">
                                <i className="icon-rotate-left py-2 pt-0 second-primary-color"></i>
                            </span>
                            <div className="icon-box-content">
                                <h3 className="icon-box-title font-size-normal mb-0 font-weight-bold text-uppercase second-primary-color">Return &amp; Refund</h3>
                                <p className="font-weight-light second-primary-color">100% money back guarantee</p>
                            </div>
                        </div>
                        <div className="icon-box mb-0 d-md-flex align-items-md-center text-center text-md-left mx-md-0 mx-auto">
                            <span className="icon-box-icon text-dark mb-0">
                                <i className="icon-life-ring py-2 pt-0 second-primary-color"></i>
                            </span>
                            <div className="icon-box-content">
                                <h3 className="icon-box-title font-size-normal mb-0 font-weight-bold text-uppercase second-primary-color">Quality Support</h3>
                                <p className="font-weight-light second-primary-color">Alway online feedback 24/7</p>
                            </div>
                        </div>
                        <div className="icon-box mb-0 d-md-flex align-items-md-center text-center text-md-left mx-md-0 mx-auto">
                            <span className="icon-box-icon text-dark mb-0">
                                <i className="icon-envelope py-2 pt-0 second-primary-color"></i>
                            </span>
                            <div className="icon-box-content">
                                <h3 className="icon-box-title font-size-normal mb-0 font-weight-bold text-uppercase second-primary-color">JOIN OUR NEWSLETTER</h3>
                                <p className="font-weight-light second-primary-color">Get notified for offers & discounts</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="mt-2 mb-0 " />
            </div>
    );
};

export default HomeService;