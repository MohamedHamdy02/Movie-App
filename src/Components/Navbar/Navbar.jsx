import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ userData, logOut }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg avbar navbar-dark bg-dark py-4">
        <div className="container">
          <a className="navbar-brand text-danger" href="#">
            Noxe
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 position-relative">
                <li className="nav-item ">
                  <Link className="nav-link hover text-white" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link hover text-white" to="tv">
                    TV Shows
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link hover text-white" to="movies">
                    Movies
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link hover text-white" to="people">
                    People
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex me-3">
                <a
                  className="nav-link text-white hover"
                  href="https://www.facebook.com"
                  target="_blank"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a
                  className="nav-link text-white hover"
                  href="https://www.instagram.com"
                  target="_blank"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  className="nav-link text-white hover"
                  href="https://www.twitter.com"
                  target="_blank"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  className="nav-link text-white hover"
                  href="https://www.spotify.com"
                  target="_blank"
                >
                  <i className="fab fa-spotify"></i>
                </a>
                <a
                  className="nav-link text-white hover"
                  href="https://www.youtube.com"
                  target="_blank"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </li>
              {userData ? (
                <li className="nav-item d-flex media-query align-items-center">
                  <span className="text-white margin">Welcome
                    <span className="text-info mx-2">
                      {userData.first_name} {userData.last_name}
                    </span>
                  </span>
                  <Link to="profile">
                    <span className=" mx-3 text-white profile margin">Profile</span>
                  </Link>

                  <span
                    className=" hover text-white cursor-pointer me-2 custom"
                    onClick={logOut}>
                    Logout
                  </span>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
