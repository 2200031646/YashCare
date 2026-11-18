import { useEffect, useState } from "react";
import camps from "../data/campsData";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    camps: 0,
    requests: 0,
    donations: 0
  });

  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [donations, setDonations] = useState([]);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(
      localStorage.getItem("yashcareUsers") || "[]"
    );

    const storedRequests = JSON.parse(
      localStorage.getItem("assistanceRequests") || "[]"
    );

    const storedDonations = JSON.parse(
      localStorage.getItem("donations") || "[]"
    );

    const storedFeedback = JSON.parse(
      localStorage.getItem("yashcareFeedback") || "[]"
    );

    const totalDonations = storedDonations.reduce(
      (total, donation) => total + Number(donation.amount || 0),
      0
    );

    setUsers(storedUsers);
    setRequests(storedRequests);
    setDonations(storedDonations);
    setFeedback(storedFeedback);

    setStats({
      users: storedUsers.length,
      camps: camps.length,
      requests: storedRequests.length,
      donations: totalDonations
    });
  }, []);

  function updateRequestStatus(requestId, newStatus) {
    const updatedRequests = requests.map((request) =>
      request.requestId === requestId
        ? { ...request, status: newStatus }
        : request
    );

    setRequests(updatedRequests);

    localStorage.setItem(
      "assistanceRequests",
      JSON.stringify(updatedRequests)
    );
  }

  return (
    <div className="admin-dashboard container">
      <div className="admin-heading">
        <h2>Admin Dashboard</h2>
        <p>Welcome to the YashCare administration panel.</p>
      </div>

      {/* Overview Cards */}
      <div className="row g-4">
        <div className="col-md-6 col-lg-3">
          <div className="admin-stat-card">
            <h6>Total Users</h6>
            <h2>{stats.users}</h2>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="admin-stat-card">
            <h6>Medical Camps</h6>
            <h2>{stats.camps}</h2>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="admin-stat-card">
            <h6>Assistance Requests</h6>
            <h2>{stats.requests}</h2>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="admin-stat-card">
            <h6>Total Donations</h6>
            <h2>₹{stats.donations.toLocaleString("en-IN")}</h2>
          </div>
        </div>
      </div>

      {/* User Management */}
      <div className="admin-section">
        <h3>User Management</h3>
        <p>View all registered patients and donors.</p>

        {users.length === 0 ? (
          <p>No registered users available.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Role</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Assistance Request Management */}
      <div className="admin-section">
        <h3>Assistance Request Management</h3>
        <p>Review patient requests and update their status.</p>

        {requests.length === 0 ? (
          <p>No assistance requests available.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Patient Name</th>
                  <th>Assistance Type</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Update Status</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((request) => (
                  <tr key={request.requestId}>
                    <td>{request.requestId}</td>
                    <td>{request.name}</td>
                    <td>{request.assistanceType}</td>
                    <td>{request.description}</td>
                    <td>{request.status}</td>

                    <td>
                      <select
                        className="form-select"
                        value={request.status || "Pending"}
                        onChange={(e) =>
                          updateRequestStatus(
                            request.requestId,
                            e.target.value
                          )
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Medical Camp Management */}
      <div className="admin-section">
        <h3>Medical Camp Management</h3>
        <p>View all available medical camps.</p>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Camp Name</th>
                <th>Category</th>
                <th>Date</th>
                <th>Location</th>
              </tr>
            </thead>

            <tbody>
              {camps.map((camp) => (
                <tr key={camp.id}>
                  <td>{camp.title}</td>
                  <td>{camp.category}</td>
                  <td>{camp.date}</td>
                  <td>{camp.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Donation Management */}
      <div className="admin-section">
        <h3>Donation Management</h3>
        <p>View all donations and donor details.</p>

        {donations.length === 0 ? (
          <p>No donations available.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Donation ID</th>
                  <th>Donor Name</th>
                  <th>Email</th>
                  <th>Campaign</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {donations.map((donation) => (
                  <tr key={donation.donationId}>
                    <td>{donation.donationId}</td>
                    <td>{donation.name}</td>
                    <td>{donation.email}</td>
                    <td>{donation.campaignName}</td>
                    <td>
                      ₹{Number(donation.amount).toLocaleString("en-IN")}
                    </td>
                    <td>{donation.donatedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Feedback Management */}
      <div className="admin-section">
        <h3>Feedback Management</h3>
        <p>View feedback and suggestions submitted by users.</p>

        {feedback.length === 0 ? (
          <p>No feedback submissions available.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Service</th>
                  <th>Rating</th>
                  <th>Comments</th>
                  <th>Submitted Date</th>
                </tr>
              </thead>

              <tbody>
                {feedback.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.service}</td>
                    <td>
                      <span style={{ color: "#f4b400" }}>
                        {"★".repeat(item.rating)}
                      </span>
                      <span style={{ color: "#cbd5d5" }}>
                        {"★".repeat(5 - item.rating)}
                      </span>
                      {" "}({item.rating}/5)
                    </td>
                    <td>{item.comments}</td>
                    <td>{item.submittedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
