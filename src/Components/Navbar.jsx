import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaAlignRight } from 'react-icons/fa';
import { useUserAuth } from '../contexts/UserAuthContext';
import '../CSS/Navbar.css'; // Ensure this file includes necessary CSS for the Navbar

const Navbar = () => {
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logOut();
      navigate("/signin");
    } catch {
      console.log("can't logout");
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <span
            className="navbar-brand font-weight-bolder"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Rama Celebration
          </span>
          <a
            href="void(0)"
            className="navbar-toggler border-0"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>
              <FaAlignRight className="nav-icon" />
            </span>
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" exact="true" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact="true" to="/rooms">
                  Rooms
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact="true" to="/decorations">
                  Decorations
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact="true" to="/caterers">
                  Caterers
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact="true" to="/lawn-booking">
                  Lawn Booking
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact="true" to="/bookings">
                  Bookings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact="true" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact="true" to="/contact-us">
                  Contact
                </NavLink>
              </li>
              {user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" exact="true" to="/add-room">
                      Add Room
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link" exact="true" to="/signup">
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={handleLogout}
                      >
                        Log Out
                      </button>
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink className="nav-link" exact="true" to="/signin">
                      <button type="button" className="btn btn-outline-success">
                        Log in
                      </button>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link" exact="true" to="/signup">
                      <button type="button" className="btn btn-outline-danger">
                        Sign up
                      </button>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
