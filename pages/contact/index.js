import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import CustomHead from "@/components/CustomHead";

const Contact = () => {
  const [siteInfo, setSiteInfo] = useState(null);
  const getSiteInfo = async () => {
    const siteinfo = await axios.get(`/api/admin/siteinfo/find`);
    setSiteInfo(siteinfo);
  };
  useEffect(() => {
    getSiteInfo();
  }, []);
  return (
    <>
      <CustomHead title="Contact" url="https://safefoods.com.bd/contact" />

      <main className="main">
        <div
          className="page-header text-center"
          style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
        >
          <div className="container">
            <h1 className="page-title">Contact Us</h1>
          </div>
        </div>
        <div className="page-content p-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb-2 mb-lg-0">
                <h2 className="title mb-1">Contact Information</h2>
                {/* End .title mb-2 */}
                {/* <p className="mb-3">
                Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod
                dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu,
                dapibus eu, fermentum et, dapibus sed, urna.
              </p> */}
                <div className="row">
                  <div className="col-sm-7">
                    <div className="contact-info">
                      <h3>The Office</h3>
                      <ul className="contact-list">
                        <li>
                          <i className="icon-map-marker" />
                          {siteInfo?.data?.siteinfo?.address}
                        </li>
                        <li>
                          <i className="icon-phone" />
                          <span>{siteInfo?.data?.siteinfo?.phone}</span>
                        </li>
                        <li>
                          <i className="icon-envelope" />
                          <span>{siteInfo?.data?.siteinfo?.email}</span>
                        </li>
                      </ul>
                      {/* End .contact-list */}
                    </div>
                    {/* End .contact-info */}
                  </div>
                  {/* End .col-sm-7 */}
                  <div className="col-sm-5">
                    <div className="contact-info">
                      <h3>The Office</h3>
                      <ul className="contact-list">
                        <li>
                          <i className="icon-clock-o" />
                          <span className="text-dark">
                            Saturday-Thursday
                          </span>{" "}
                          <br />
                          11am-7pm ET
                        </li>
                        <li>
                          <i className="icon-calendar" />
                          <span className="text-dark">Friday</span> <br />
                          Holiday
                        </li>
                      </ul>
                      {/* End .contact-list */}
                    </div>
                    {/* End .contact-info */}
                  </div>
                  {/* End .col-sm-5 */}
                </div>
                {/* End .row */}
              </div>
              {/* End .col-lg-6 */}
              <div className="col-lg-6">
                <h2 className="title mb-1">Our Location</h2>
                {/* End .title mb-2 */}

                <iframe
                  className="w-100"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d542.5950619952297!2d90.42891183575155!3d23.813977975718284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c73b088f5303%3A0x44617a45f00d4bb7!2sBanasree!5e0!3m2!1sen!2sbd!4v1684403593657!5m2!1sen!2sbd"
                  height={300}
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
