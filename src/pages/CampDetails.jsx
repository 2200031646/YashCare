import { useParams, useNavigate } from "react-router-dom";
import camps from "../data/campsData";
import "./CampDetails.css";

function CampDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const camp = camps.find((item) => item.id === Number(id));

  if (!camp) {
    return (
      <div className="camp-not-found">
        <h2>Medical Camp Not Found</h2>
        <button onClick={() => navigate("/camps")}>
          Back to Camps
        </button>
      </div>
    );
  }

  return (
    <div className="camp-details-page">
      <div className="camp-details-card">
        <img src={camp.image} alt={camp.title} />

        <div className="camp-details-info">
          <span className="camp-category">{camp.category}</span>

          <h1>{camp.title}</h1>

          <p className="camp-description">{camp.description}</p>

          <div className="camp-info-list">
            <p><strong>Date:</strong> {camp.date}</p>
            <p><strong>Time:</strong> {camp.time}</p>
            <p><strong>Location:</strong> {camp.location}</p>
            <p><strong>Venue:</strong> {camp.venue}</p>
          </div>

          <button className="register-camp-btn" onClick={() => navigate(`/camp-register/${camp.id}`)}>Register for Camp</button>
          <button className="back-camps-btn" onClick={() => navigate("/camps")}>Back to Medical Camps</button>
        </div>
      </div>
    </div>
  );
}

export default CampDetails;
