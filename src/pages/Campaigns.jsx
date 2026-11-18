import { useState, useEffect } from "react";
import campaigns from "../data/campaignsData";
import "./Campaigns.css";
import { Link, useLocation } from "react-router-dom";

function Campaigns() {
  const [campaignAmounts, setCampaignAmounts] = useState({});
  const location = useLocation();

  useEffect(() => {
    const savedAmounts = JSON.parse(
      localStorage.getItem("campaignAmounts") || "{}"
    );

    setCampaignAmounts(savedAmounts);
  }, [location.key]);

  return (
    <div className="campaigns-page">
      <div className="campaigns-header">
        <h1>Support a Healthcare Campaign</h1>
        <p>
          Your contribution can help make healthcare accessible to everyone.
        </p>
      </div>

      <div className="campaigns-container">
        {campaigns.map((campaign) => {
          const collected =
            Number(campaignAmounts[campaign.id] ?? campaign.collected);

          const progress = Math.min(
            (collected / campaign.goal) * 100,
            100
          );

          return (
            <div className="campaign-card" key={campaign.id}>
              <img
                src={campaign.image}
                alt={campaign.title}/>

              <div className="campaign-content">
                <span className="campaign-category">
                  {campaign.category}
                </span>

                <h3>{campaign.title}</h3>

                <p>{campaign.description}</p>

                <div className="campaign-amounts">
                  <span>
                    ₹{collected.toLocaleString("en-IN")} raised
                  </span>

                  <span>
                    Goal: ₹{campaign.goal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <p className="progress-text">
                  {progress.toFixed(1)}% of goal reached
                </p>

                <Link to={`/donate/${campaign.id}`} className="donate-btn">Donate Now</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Campaigns;
