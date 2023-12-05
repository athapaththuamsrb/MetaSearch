import React from "react";

const Contact = () => {
  return (
    <div className="container mt-4 text-light custom-form-container">
      <h1>Contact Us</h1>
      <p>
        Have questions or feedback? Please get in touch with us using the
        contact form below:
      </p>

      <form>
        <div className="row">
          <div className="col-2"></div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Your Name"
              />
            </div>
          </div>
          <div className="col-2"></div>
          <div className="col-3">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Your Email"
              />
            </div>
          </div>
          <div className="col-2"></div>
        </div>
        <div className="row mt-3 mb-3">
          <div className="col-2"></div>
          <div className="col-8">
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                className="form-control"
                id="message"
                rows="5"
                placeholder="Your Message"
              ></textarea>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
        <button type="submit" className="btn btn-primary mb-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
