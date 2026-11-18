import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(() => {
    return JSON.parse(
      localStorage.getItem("yashcareLoggedInUser") || "null"
    );
  });

  useEffect(() => {
    function updateUser() {
      setUser(
        JSON.parse(
          localStorage.getItem("yashcareLoggedInUser") || "null"
        )
      );
    }

    window.addEventListener("storage", updateUser);
    window.addEventListener("yashcare-auth-change", updateUser);

    return () => {
      window.removeEventListener("storage", updateUser);
      window.removeEventListener("yashcare-auth-change", updateUser);
    };
  }, []);

  // Home Navigation
  function handleHomeClick(e) {
    e.preventDefault();
    navigate("/", { replace: true });
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // About Navigation
  function handleAboutClick(e) {
    e.preventDefault();

    if (location.pathname === "/") {
      navigate("/#about");

      setTimeout(() => {
        document.getElementById("about")?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 100);
    } else {
      navigate("/#about");
    }
  }

  // Contact Navigation
  function handleContactClick(e) {
    e.preventDefault();
    if (location.pathname === "/") {
      navigate("/#contact");
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 100);
    } else {
      navigate("/#contact");
    }
  }

  // Logout
  function handleLogout() {
    localStorage.removeItem("yashcareLoggedInUser");
    setUser(null);
    window.dispatchEvent(new Event("yashcare-auth-change"));
    navigate("/", { replace: true });
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  const role = user?.role?.toLowerCase();

  return (
    <nav className="navbar navbar-expand-lg yash-navbar">
      <div className="container">

        {/* Logo */}
        <Link
          className="navbar-brand yash-logo"
          to="/"
          onClick={handleHomeClick}>
          Yash<span>Care</span>
          <small>Healthcare for Everyone</small>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">

          <ul className="navbar-nav mx-auto">

            {/* Home */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                onClick={handleHomeClick}>
                Home
              </Link>
            </li>

            {/* About */}
            <li className="nav-item">
              <a
                className="nav-link"
                href="/#about"
                onClick={handleAboutClick}>
                About
              </a>
            </li>

            {/* Services Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                Services
              </a>

              <ul className="dropdown-menu">
                {(!user || role === "patient") && (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/camps">Medical Camps</Link>
                    </li>

                    {role === "patient" && (
                      <>
                        <li>
                          <Link className="dropdown-item" to="/assistance-request">Healthcare Assistance</Link>
                        </li>

                        <li>
                          <Link className="dropdown-item" to="/track-requests">Track Requests</Link>
                        </li>
                      </>
                    )}
                  </>
                )}

                {(!user || role === "donor") && (
                  <li>
                    <Link className="dropdown-item" to="/campaigns">Donation Campaigns</Link>
                  </li>
                )}

                {role === "admin" && (
                  <li>
                    <Link className="dropdown-item" to="/admin-dashboard">Admin Dashboard</Link>
                  </li>
                )}

              </ul>
            </li>

            {/* My Activity Dropdown */}
            {user && (role === "patient" || role === "donor") && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  My Activity
                </a>

                <ul className="dropdown-menu">

                  {role === "patient" && (
                    <li>
                      <Link className="dropdown-item" to="/my-registrations">My Registrations</Link>
                    </li>
                  )}

                  {role === "donor" && (
                    <li>
                      <Link className="dropdown-item" to="/my-donations">My Donations</Link>
                    </li>
                  )}

                </ul>
              </li>
            )}

            {/* Feedback */}
            {role !== "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/feedback">Feedback</Link>
              </li>
            )}

            {/* Contact */}
            <li className="nav-item">
              <a className="nav-link" href="/#contact" onClick={handleContactClick}>Contact
              </a>
            </li>
          </ul>

          {/* Login / Logout */}
          <div className="nav-buttons">
            {user ? (
              <button className="login-btn" onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <Link className="login-btn" to="/login">Login</Link>
                <Link className="register-btn" to="/register">Get Started</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
