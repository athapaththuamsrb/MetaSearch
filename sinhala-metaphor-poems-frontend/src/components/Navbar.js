import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import {
  JournalBookmark,
  SearchHeart,
  People,
  PersonLinesFill,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const MyNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <div className="container">
        <Navbar.Brand href="/">
          <img
            src="logo.gif"
            alt="logo"
            style={{ width: "48px", height: "48px" }}
          />
          සිංහල කාව්‍ය රූපක ගෙදර
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-5">
            <Link to="/summary" className="no-underline-link ">
              <JournalBookmark size={24} /> Summary
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link to="/search" className="no-underline-link ">
              <SearchHeart size={24} /> Search
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link to="/about" className="no-underline-link ">
              <People size={24} /> About
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link to="/contact" className="no-underline-link ">
              <PersonLinesFill size={24} /> Contact
            </Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default MyNavbar;
