import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import camps from "../data/campsData";
import "./CampRegistration.css";

function CampRegistration() {
  const { id } = useParams();
  const navigate = useNavigate();

  const camp = camps.find((item) => item.id === Number(id));

  const loggedInUser = JSON.parse(
    localStorage.getItem("yashcareLoggedInUser") || "null"
  );

  const registeredUsers = JSON.parse(
    localStorage.getItem("yashcareUsers") || "[]"
  );

  const accountDetails = registeredUsers.find(
    (user) =>
      user.email.toLowerCase() === loggedInUser?.email?.toLowerCase()
  );

  const [formData, setFormData] = useState({
    name: loggedInUser?.fullName || "",
    email: loggedInUser?.email || "",
    mobile: accountDetails?.mobile || ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    const registrations = JSON.parse(
      localStorage.getItem("campRegistrations") || "[]"
    );

    const registrationId = "YCR" + Date.now();

    const newRegistration = {
      registrationId,
      campId: camp.id,
      campName: camp.title,
      name: loggedInUser.fullName,
      email: loggedInUser.email.toLowerCase(),
      userEmail: loggedInUser.email.toLowerCase(),
      mobile: formData.mobile
    };

    registrations.push(newRegistration);

    localStorage.setItem(
      "campRegistrations",
      JSON.stringify(registrations)
    );

    setMessage(
      `Registration successful! Your Registration ID is ${registrationId}`
    );

    setFormData({
      name: loggedInUser.fullName,
      email: loggedInUser.email,
      mobile: formData.mobile
    });
  };

  if (!camp) {
    return <h2>Medical Camp Not Found</h2>;
  }

  return (
    <div className="registration-page">
      <div className="registration-card">
        <h2>Camp Registration</h2>

        <p className="selected-camp">
          Registering for: <strong>{camp.title}</strong>
        </p>

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            readOnly
            required/>

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            required/>

          <label>Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter 10-digit mobile number"
            pattern="[0-9]{10}"
            maxLength="10"
            required/>

          <button type="submit" className="registration-btn">Register Now</button>
        </form>

        <button className="back-btn" onClick={() => navigate(`/camp/${camp.id}`)}>Back to Camp Details</button>
      </div>
    </div>
  );
}

export default CampRegistration;