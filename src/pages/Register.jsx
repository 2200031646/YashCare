import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    role: "",
    password: "",
    confirmPassword: ""
  });

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

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      setMessageType("error");
      return;
    }

    // Password validation
    if (!/^(?=.*[a-z])(?=.*[0-9]).{6,}$/.test(formData.password)) {
      setMessage(
        "Password must contain at least 6 characters, one lowercase letter and one number."
      );
      setMessageType("error");
      return;
    }

    const existingUsers = JSON.parse(
      localStorage.getItem("yashcareUsers") || "[]"
    );

    const emailExists = existingUsers.some(
      (user) =>
        user.email.toLowerCase() === formData.email.trim().toLowerCase()
    );

    if (emailExists) {
      setMessage("This email is already registered!");
      setMessageType("error");
      return;
    }

    const newUser = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      mobile: formData.mobile.trim(),
      role: formData.role
    };

    existingUsers.push({
      ...newUser,
      password: formData.password
    });

    localStorage.setItem(
      "yashcareUsers",
      JSON.stringify(existingUsers)
    );

    setMessage("Account created successfully!");
    setMessageType("success");

    setFormData({
      fullName: "",
      email: "",
      mobile: "",
      role: "",
      password: "",
      confirmPassword: ""
    });
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-info">

          <Link to="/" className="register-logo">
            Yash<span>Care</span>
          </Link>

          <p className="register-tagline">
            Healthcare for Everyone
          </p>

          <h2>Be a Part of a Caring Community</h2>

          <p>
            Join YashCare to discover medical camps,
            request healthcare assistance, and support
            communities through meaningful contributions.
          </p>

          <div className="register-highlight">
            ♥ Together, we can make a difference.
          </div>
        </div>

        <div className="register-form-section">
          <h2>Create Your Account</h2>

          <p className="form-description">
            Fill in your details to get started with YashCare.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-control"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required/>
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required/>
            </div>

            <div className="mb-3">
              <label className="form-label">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                className="form-control"
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={handleChange}
                pattern="[0-9]{10}"
                title="Enter a valid 10-digit mobile number"
                required/>
            </div>

            <div className="mb-3">
              <label className="form-label">I want to join as</label>
              <select
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
                required>
                <option value="">Select your role</option>
                <option value="patient">Patient</option>
                <option value="donor">Donor</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                minLength="6"
                pattern="(?=.*[a-z])(?=.*[0-9]).{6,}"
                title="Password must contain at least 6 characters, one lowercase letter and one number."
                required/>
            </div>

            <div className="mb-4">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required/>
            </div>

            {message && (
              <p className={
                messageType === "success"
                  ? "success-message"
                  : "error-message"
              }>
                {message}
              </p>
            )}

            <button type="submit" className="register-submit-btn">Create Account</button>

          </form>

          <p className="login-text">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;