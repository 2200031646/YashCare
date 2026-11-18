import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const email = formData.email.trim().toLowerCase();

    // Demo Admin account
    if (
      email === "admin@yashcare.com" &&
      formData.password === "Admin@123"
    ) {
      localStorage.setItem(
        "yashcareLoggedInUser",
        JSON.stringify({
          fullName: "Admin",
          email: email,
          role: "Admin"
        })
      );

      window.dispatchEvent(new Event("yashcare-auth-change"));

      setMessage("Admin login successful!");
      setMessageType("success");

      navigate("/");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("yashcareUsers") || "[]"
    );

    const loggedInUser = users.find(
      (user) =>
        user.email.toLowerCase() === email &&
        user.password === formData.password
    );

    if (loggedInUser) {
      const role =
        loggedInUser.role.charAt(0).toUpperCase() +
        loggedInUser.role.slice(1).toLowerCase();

      localStorage.setItem(
        "yashcareLoggedInUser",
        JSON.stringify({
          fullName: loggedInUser.fullName,
          email: loggedInUser.email,
          role: role
        })
      );

      window.dispatchEvent(new Event("yashcare-auth-change"));

      setMessage(`Welcome back, ${loggedInUser.fullName}!`);
      setMessageType("success");

      if (role === "Patient") {
        navigate("/camps");
      } else if (role === "Donor") {
        navigate("/campaigns");
      } else if (role === "Admin") {
        navigate("/");
      }

    } else {
      setMessage("Invalid email or password!");
      setMessageType("error");
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">

        {/* Login Information */}
        <div className="login-info">
          <Link to="/" className="login-logo">
            Yash<span>Care</span>
          </Link>

          <p className="login-tagline">
            Healthcare for Everyone
          </p>

          <h2>Welcome Back to Your Caring Community</h2>

          <p>
            Sign in to explore medical camps, manage
            healthcare assistance, and support meaningful
            community initiatives.
          </p>

          <div className="login-highlight">
            ♥ Together, we care. Together, we grow.
          </div>

        </div>

        {/* Login Form */}
        <div className="login-form-section">
          <h2>Welcome Back!</h2>

          <p className="login-description">
            Enter your account details to continue.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <label className="form-label">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required/>
            </div>

            <div className="mb-4">
              <label className="form-label">
                Password
              </label>

              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required/>

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {message && (
              <p className={
                messageType === "success"
                  ? "login-success"
                  : "login-error"
              }>
                {message}
              </p>
            )}

            <button
              type="submit"
              className="login-submit-btn"
            >
              Login
            </button>

          </form>

          <p className="register-text">
            Don't have an account?{" "}
            <Link to="/register">Create Account</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;