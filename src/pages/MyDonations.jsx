import { useState, useEffect } from "react";
import "./MyDonations.css";

function MyDonations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(
      localStorage.getItem("yashcareLoggedInUser") || "null"
    );

    const savedDonations = JSON.parse(
      localStorage.getItem("donations") || "[]"
    );

    if (!loggedInUser?.email) {
      setDonations([]);
      return;
    }

    const myDonations = savedDonations.filter(
      (donation) =>
        (donation.email || donation.donorEmail || donation.userEmail)
          ?.toLowerCase() === loggedInUser.email.toLowerCase()
    );

    setDonations(myDonations);
  }, []);

  return (
    <div className="my-donations-page">
      <div className="donations-header">
        <h1>My Donations</h1>
        <p>View your contributions to healthcare campaigns.</p>
      </div>

      {donations.length === 0 ? (
        <div className="no-donations">
          <h3>No Donations Yet</h3>
          <p>Your donation history will appear here.</p>
        </div>
      ) : (
        <div className="donations-container">
          {donations.map((donation) => (
            <div
              className="donation-history-card"
              key={donation.donationId}
            >
              <h3>{donation.campaignName}</h3>

              <p>
                <strong>Donation ID:</strong> {donation.donationId}
              </p>

              <p>
                <strong>Donor Name:</strong> {donation.name}
              </p>

              <p>
                <strong>Amount:</strong>{" "}
                ₹{Number(donation.amount).toLocaleString("en-IN")}
              </p>

              <p>
                <strong>Date:</strong> {donation.donatedAt}
              </p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyDonations;