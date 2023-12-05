import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div
      className="container text-center text-light"
      style={{ height: "80vh" }}
    >
      <div className="row">
        <div className="col-md-12">
          <h1 className="display-4">404 - Not Found</h1>
          <p className="lead">
            The page you are looking for could not be found.
          </p>
          <img
            src="notFound.png"
            alt="Not Found"
            className="img-fluid bg-light"
            style={{ width: "40%", height: "50%" }}
          />
          <p>
            Return to{" "}
            <Link to="/" className="no-underline-link">
              Home page
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
