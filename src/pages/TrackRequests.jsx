import { useEffect, useState } from "react";
import "./TrackRequests.css";

function TrackRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(
      localStorage.getItem("yashcareLoggedInUser") || "null"
    );

    const savedRequests = JSON.parse(
      localStorage.getItem("assistanceRequests") || "[]"
    );

    const userRequests = savedRequests.filter(
      (request) =>
        request.email?.toLowerCase() ===
        loggedInUser?.email?.toLowerCase()
    );

    setRequests(userRequests);
  }, []);

  return (
    <div className="track-requests-page">
      <div className="track-header">
        <h1>Track My Requests</h1>
        <p>Check the status of your healthcare assistance requests.</p>
      </div>

      {requests.length > 0 ? (
        <div className="requests-container">
          {requests.map((request) => (
            <div className="request-card" key={request.requestId}>
              <h3>{request.assistanceType}</h3>

              <p>
                <strong>Request ID:</strong> {request.requestId}
              </p>

              <p>
                <strong>Name:</strong> {request.name}
              </p>

              <p>
                <strong>Submitted Date:</strong> {request.submittedAt}
              </p>

              <p>
                <strong>Description:</strong> {request.description}
              </p>

              <span
                className={`request-status ${(request.status || "Pending").toLowerCase()}`}
              >
                {request.status || "Pending"}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-requests">
          <h3>No Requests Found</h3>
          <p>You haven't submitted any healthcare assistance requests yet.</p>
        </div>
      )}
    </div>
  );
}

export default TrackRequests;