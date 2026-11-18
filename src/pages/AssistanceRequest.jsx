import { useState } from "react";
import "./AssistanceRequest.css";

function AssistanceRequest() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    assistanceType: "",
    description: ""
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
    const requests = JSON.parse(
      localStorage.getItem("assistanceRequests")
    ) || [];

    const requestId = "YAR" + Date.now();

    const newRequest = {
      requestId,
      ...formData,
      status: "Pending",
      submittedAt: new Date().toLocaleDateString()
    };

    requests.push(newRequest);

    localStorage.setItem(
      "assistanceRequests",
      JSON.stringify(requests)
    );

    setMessage(
      `Request submitted successfully! Your Request ID is ${requestId}`
    );

    setFormData({
      name: "",
      email: "",
      mobile: "",
      assistanceType: "",
      description: ""
    });
  };

  return (
    <div className="assistance-page">
      <div className="assistance-card">
        <h2>Healthcare Assistance Request</h2>

        <p className="assistance-subtitle">
          Submit your request and let us know how we can help.
        </p>

        {message && (
          <div className="assistance-success">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required/>

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
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

          <label>Type of Assistance</label>
          <select
            name="assistanceType"
            value={formData.assistanceType}
            onChange={handleChange}
            required>
            <option value="">Select assistance type</option>
            <option value="Medical Support">Medical Support</option>
            <option value="Financial Assistance">Financial Assistance</option>
            <option value="Medicine Support">Medicine Support</option>
            <option value="Health Camp Support">Health Camp Support</option>
            <option value="Other">Other</option>
          </select>

          <label>Request Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Briefly describe the assistance you need"
            rows="4"
            required/>

          <button type="submit" className="assistance-btn">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default AssistanceRequest;