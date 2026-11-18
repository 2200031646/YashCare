import { useEffect, useState } from "react";
import "./MyRegistrations.css";

function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(
      localStorage.getItem("yashcareLoggedInUser") || "null"
    );

    const savedRegistrations = JSON.parse(
      localStorage.getItem("campRegistrations") || "[]"
    );

    if (!loggedInUser) {
      setRegistrations([]);
      return;
    }

    const userEmail = loggedInUser.email.toLowerCase();

    const userRegistrations = savedRegistrations.filter(
      (registration) => {
        const registrationEmail = (
          registration.userEmail || registration.email || ""
        ).toLowerCase();

        return registrationEmail === userEmail;
      }
    );

    setRegistrations(userRegistrations);
  }, []);

  return (
    <div className="my-registrations-page">
      <div className="registrations-header">
        <h1>My Registrations</h1>
        <p>View your medical camp registrations.</p>
      </div>

      {registrations.length > 0 ? (
        <div className="registrations-container">
          {registrations.map((registration) => (
            <div
              className="registration-item"
              key={registration.registrationId}>
              <h3>{registration.campName}</h3>

              <p>
                <strong>Registration ID:</strong>{" "}
                {registration.registrationId}
              </p>

              <p>
                <strong>Name:</strong> {registration.name}
              </p>

              <p>
                <strong>Email:</strong> {registration.email}
              </p>

              <p>
                <strong>Mobile:</strong> {registration.mobile}
              </p>

              <span className="registration-status">
                Registered
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-registrations">
          <h3>No Registrations Yet</h3>
          <p>You haven't registered for any medical camps.</p>
        </div>
      )}
    </div>
  );
}

export default MyRegistrations;
