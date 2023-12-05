import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light">
      <div className="container">
        <div className="row pt-3">
          <div className="col-md-4">
            <h4>About Us</h4>
            <p>Your About Us content goes here.</p>
          </div>
          <div className="col-md-4">
            <h4>Quick Links</h4>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="no-underline-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="no-underline-link">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="no-underline-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4>Contact Us</h4>
            <address>
              Email:{" "}
              <Link
                to="supunathpaththu.19@cse.mrt.ac.lk"
                className="no-underline-link"
              >
                supunathpaththu.19@cse.mrt.ac.lk
              </Link>
              <br />
              Phone: +94 (123) 4-567-890
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
