import { useState } from "react";
import "./Feedback.css";

function Feedback() {
  const loggedInUser = JSON.parse(
    localStorage.getItem("yashcareLoggedInUser") || "null"
  );

  const [formData, setFormData] = useState({
    name: loggedInUser?.fullName || "",
    email: loggedInUser?.email || "",
    service: "",
    rating: 0,
    comments: ""
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleRating(value) {
    setFormData({
      ...formData,
      rating: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.rating === 0) {
      setMessage("Please select a star rating.");
      return;
    }

    const existingFeedback = JSON.parse(
      localStorage.getItem("yashcareFeedback") || "[]"
    );

    const newFeedback = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      service: formData.service,
      rating: formData.rating,
      comments: formData.comments.trim(),
      submittedAt: new Date().toLocaleString()
    };

    existingFeedback.push(newFeedback);

    localStorage.setItem(
      "yashcareFeedback",
      JSON.stringify(existingFeedback)
    );

    setMessage("Thank you! Your feedback has been submitted successfully.");

    setFormData({
      name: loggedInUser?.fullName || "",
      email: loggedInUser?.email || "",
      service: "",
      rating: 0,
      comments: ""
    });
  }

  return (
    <div className="feedback-page">
      <div className="feedback-header">
        <span>YOUR OPINION MATTERS</span>
        <h1>Share Your Feedback</h1>
        <p>
          Help us improve YashCare. Tell us about your experience
          with our healthcare services.
        </p>
      </div>

      <div className="feedback-container">
        <form className="feedback-form" onSubmit={handleSubmit}>

          <h2>We'd Love to Hear From You!</h2>
          <p className="feedback-subtitle">
            Please share your experience with us.
          </p>

          <div className="feedback-field">
            <label>Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required/>
          </div>

          <div className="feedback-field">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required/>
          </div>

          <div className="feedback-field">
            <label>Which service are you giving feedback about?</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required>
              <option value="">Select a service</option>
              <option value="Medical Camps">Medical Camps</option>
              <option value="Healthcare Assistance">
                Healthcare Assistance
              </option>
              <option value="Donation Campaigns">
                Donation Campaigns
              </option>
              <option value="Website Experience">
                Website Experience
              </option>
              <option value="Overall Experience">
                Overall Experience
              </option>
            </select>
          </div>

          <div className="feedback-field">
            <label>How would you rate your experience?</label>

            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={star <= formData.rating ? "star active" : "star"}
                  onClick={() => handleRating(star)}
                  aria-label={`Rate ${star} out of 5 stars`}
                  aria-pressed={star === formData.rating}>
                  ★
                </button>
              ))}
            </div>

            <small>
              {formData.rating > 0
                ? `${formData.rating} out of 5 stars`
                : "Select your rating"}
            </small>
          </div>

          <div className="feedback-field">
            <label>Comments and Suggestions</label>
            <textarea
              name="comments"
              rows="3"
              placeholder="Share your experience or suggestions..."
              value={formData.comments}
              onChange={handleChange}
              required/>
          </div>

          {message && (
            <p className="feedback-message" role="status">
              {message}
            </p>
          )}

          <button type="submit" className="feedback-submit">Submit Feedback</button>

        </form>
      </div>
    </div>
  );
}

export default Feedback;