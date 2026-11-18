import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import campaigns from "../data/campaignsData";
import "./DonationForm.css";

function DonationForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const campaign = campaigns.find(
    (item) => item.id === Number(id)
  );

  const loggedInUser = JSON.parse(
    localStorage.getItem("yashcareLoggedInUser") || "null"
  );

  const [formData, setFormData] = useState({
    name: loggedInUser?.fullName || "",
    email: loggedInUser?.email || "",
    amount: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    setError("");
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(
      localStorage.getItem("yashcareLoggedInUser") || "null"
    );

    if (!currentUser || currentUser.role !== "Donor") {
      setError("Please log in using a Donor account.");
      return;
    }

    if (
      formData.email.trim().toLowerCase() !==
      currentUser.email.trim().toLowerCase()
    ) {
      setError("Email does not match your registered Donor account.");
      return;
    }

    const registeredUsers = JSON.parse(
      localStorage.getItem("yashcareUsers") || "[]"
    );

    const donorExists = registeredUsers.some(
      (user) =>
        user.email.toLowerCase() === currentUser.email.toLowerCase() &&
        user.role === "donor"
    );

    if (!donorExists) {
      setError("Donor account not found. Please register first.");
      return;
    }

    if (!campaign) {
      setError("Campaign not found.");
      return;
    }

    if (Number(formData.amount) <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }

    const donations = JSON.parse(
      localStorage.getItem("donations") || "[]"
    );

    const donationId = "YDN" + Date.now();

    const newDonation = {
      donationId,
      campaignId: campaign.id,
      campaignName: campaign.title,
      name: currentUser.fullName,
      email: currentUser.email,
      amount: Number(formData.amount),
      donatedAt: new Date().toLocaleDateString()
    };

    donations.push(newDonation);

    localStorage.setItem(
      "donations",
      JSON.stringify(donations)
    );

    const savedAmounts = JSON.parse(
      localStorage.getItem("campaignAmounts") || "{}"
    );

    const previousAmount =
      savedAmounts[campaign.id] ?? campaign.collected;

    savedAmounts[campaign.id] =
      previousAmount + Number(formData.amount);

    localStorage.setItem(
      "campaignAmounts",
      JSON.stringify(savedAmounts)
    );

    setError("");

    setMessage(
      `Thank you for your contribution! Your Donation ID is ${donationId}`
    );

    setFormData({
      name: currentUser.fullName,
      email: currentUser.email,
      amount: ""
    });
  };

  if (!campaign) {
    return <h2>Campaign Not Found</h2>;
  }

  return (
    <div className="donation-page">
      <div className="donation-card">
        <h2>Support This Campaign</h2>

        <p className="selected-campaign">
          {campaign.title}
        </p>

        {message && (
          <div className="donation-success">
            {message}
          </div>
        )}

        {error && (
          <div className="donation-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required/>

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required/>

          <label>Donation Amount (₹)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter donation amount"
            min="1"
            required/>

          <button type="submit" className="donation-btn">Confirm Donation</button>
        </form>

        <button className="donation-back-btn" onClick={() => navigate("/campaigns")}>Back to Campaigns</button>

        <p className="demo-note">
          This is a simulated donation. No real payment will be processed.
        </p>
      </div>
    </div>
  );
}

export default DonationForm;