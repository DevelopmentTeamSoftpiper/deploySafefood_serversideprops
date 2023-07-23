import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdCall } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';



const Footer = () => {

  return (
    <footer
      className="footer footer-2 font-weight-normal second-primary-color"
      style={{ backgroundColor: "#222" }}
    >
    
    <div className="container">
      <hr className="mt-0 mb-0" style={{ borderColor: "#444" }} />
    </div>

    <div className="footer-middle border-0">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-2-5cols">
            <div className="widget widget-about mb-4">
            <Image
              src="/assets/images/logo-safefoods.png"
              alt="safefood logo"
              width={65}
              height={25}
              priority={true}
            />
            
             <ul className="widget-list mt-3">
                <li>
                  <div className='d-flex items-center'>
                    <span> 
                      <FaMapMarkerAlt className='text-3xl mr-3' />
                    </span>
                    <span> Safe Food Headquarter,51/1, Senpara Parbata, Mirpur-10, Dhaka</span>
                  </div>
                </li>
                <li>
                  <div className='d-flex items-center'>
                    <span> 
                    <MdCall className='text-3xl mr-3' />
                    </span> 
                    <span> +8801730593752</span>
                  </div>
                </li>
                <li>
                  <div className='d-flex items-center'>
                    <span> 
                      <AiOutlineMail className='text-3xl mr-3' />
                    </span> 
                    <span> safefoods.info@gmail.com</span>
                  </div>
                </li>
                
              </ul>
              {/* End .widget-about-info */}
            </div>
            {/* End .widget about-widget */}
          </div>
          {/* End .col-sm-12 col-lg-3 */}

          <div className="col-sm-4 col-lg-5cols">
            <div className="widget mb-4">
              <h4 className="widget-title text-white">Information</h4>
              {/* End .widget-title */}
              <ul className="widget-list">
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/private-policy">Private Policy</Link>
                </li>
                <li>
                  <Link href="/returns-refund">Refund & Returns</Link>
                </li>
                <li>
                 <Link href="/terms-and-conditions">Terms & Conditions</Link>
                </li>
                <li>
                <Link href="/about">Contact Us</Link>
                </li>
              </ul>
              {/* End .widget-list */}
            </div>
            {/* End .widget */}
          </div>
          {/* End .col-sm-4 col-lg-3 */}
          <div className="col-sm-4 col-lg-5cols">
            <div className="widget mb-4">
              <h4 className="widget-title text-white">Customer Service</h4>
              {/* End .widget-title */}
              <ul className="widget-list">
                <li>
                  <Link href="#"></Link>
                </li>
                <li>
                  <Link href="#">Money-back guarantee!</Link>
                </li>
                <li>
                  <Link href="/returns-refund">Returns</Link>
                </li>
                <li>
                  <Link href="#">Shipping</Link>
                </li>
                <li>
                    <Link href="/terms-and-conditions">Terms and conditions</Link>
                </li>

              </ul>
              {/* End .widget-list */}
            </div>
            {/* End .widget */}
          </div>
          {/* End .col-sm-4 col-lg-3 */}
          <div className="col-sm-4 col-lg-5cols">
            <div className="widget mb-4">
              <h4 className="widget-title text-white">My Account</h4>
              {/* End .widget-title */}
              <ul className="widget-list">
              <li>
                  <Link href="/account/register">Register</Link>
                </li>
                <li>
                  <Link href="/account/login">Login</Link>
                </li>
                <li>
                  <Link href="/account/details">My Account</Link>
                </li>
                <li>
                  <Link href="/cart">View Cart</Link>
                </li>
               
                <li>
                  <Link href="/account/orders">My Orders</Link>
                </li>
              
              </ul>
              {/* End .widget-list */}
            </div>
            {/* End .widget */}
          </div>
          {/* End .col-sm-64 col-lg-3 */}
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </div>
    {/* End .footer-middle */}
    <div className="footer-bottom font-weight-normal">
      <div className="container">
        <p className="footer-copyright font-weight-normal ml-lg-2 second-primary-color">
          Copyright © 2023 Safefoods | Developed by: softpiper
        </p>
  
        {/* End .soial-icons */}
      </div>
      {/* End .container */}
    </div>

    <a
    href="https://wa.me/8801326709913?text="
    target="_blank"
    className="material-symbols-outlined floating-btn"
  >
    <div className="floating-btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 32 32"
        className="wa-messenger-svg-whatsapp wh-svg-icon"
        style={{ fill: "black", height: 80, width: 61, stroke: "none" }}
      >
        <path
          d=" M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z"
          fillRule="evenodd"
        />
      </svg>
    </div>
  </a>
    {/* End .footer-bottom */}
  </footer>
  )
}

export default Footer