import { useState } from "react";
import camps from "../data/campsData";
import "./Camps.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faClock,
  faLocationDot
} from "@fortawesome/free-solid-svg-icons";

function Camps() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredCamps = camps.filter((camp) => {
    const matchesSearch =
      camp.title.toLowerCase().includes(search.toLowerCase()) ||
      camp.location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || camp.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="camps-page">
      <div className="camps-header">
        <h1>Explore Medical Camps</h1>
        <p>
          Discover healthcare camps and take a step towards a healthier life.
        </p>
      </div>

      <div className="camp-filters">
        <input
          type="text"
          placeholder="Search by camp name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}/>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="General Health">General Health</option>
          <option value="Eye Care">Eye Care</option>
          <option value="Women's Health">Women's Health</option>
          <option value="Health Awareness">Health Awareness</option>
          <option value="Diabetes Care">Diabetes Care</option>
          <option value="Dental Care">Dental Care</option>
          <option value="Child Healthcare">Child Healthcare</option>
          <option value="Heart Care">Heart Care</option>
        </select>
      </div>

      <div className="camps-container">
        {filteredCamps.length > 0 ? (
          filteredCamps.map((camp) => (
            <div className="camp-card" key={camp.id}>
              <img src={camp.image} alt={camp.title} />

              <div className="camp-content">
                <span className="camp-category">{camp.category}</span>

                <h3>{camp.title}</h3>

                <p>{camp.description}</p>

                <div className="camp-details">
                  <p>
                    <FontAwesomeIcon icon={faCalendarDays} />
                    {camp.date}
                  </p>

                  <p>
                    <FontAwesomeIcon icon={faClock} />
                    {camp.time}
                  </p>

                  <p>
                    <FontAwesomeIcon icon={faLocationDot} />
                    {camp.location}
                  </p>

                  <p>{camp.venue}</p>
                </div>

                <Link to={`/camp/${camp.id}`} className="camp-btn">View Details</Link>
              </div>
            </div>
          ))
        ) : (
          <p className="no-camps">
            No medical camps found. Try another search.
          </p>
        )}
      </div>
    </div>
  );
}

export default Camps;