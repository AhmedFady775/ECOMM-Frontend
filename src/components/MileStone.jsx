import React, { useState } from "react";

export default function Roadmap({ milestones }) {
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const handleMilestoneClick = (milestone) => {
    setSelectedMilestone(milestone);
  };

  const handleCloseModal = () => {
    setSelectedMilestone(null);
  };

  return (
    <div className="roadmap">
      <div className="milestones">
        {milestones.map((milestone, index) => (
          <div className="milestone" key={milestone.name}>
            <div className="milestone__shapes" key={milestone.name}>
              <div
                className={`circle ${
                  selectedMilestone &&
                  selectedMilestone.name === milestone.name &&
                  "selected__circle"
                }`}
              />
              {index < milestones.length - 1 && (
                <div
                  className={`line ${
                    selectedMilestone &&
                    selectedMilestone.name === milestone.name &&
                    "selected__line"
                  }`}
                />
              )}
            </div>
            <div>
              <button
                className={`button__name ${
                  selectedMilestone &&
                  selectedMilestone.name === milestone.name &&
                  "selected__button"
                }`}
                onClick={() => handleMilestoneClick(milestone)}
              >
                {milestone.name}
              </button>
              {selectedMilestone &&
                selectedMilestone.name === milestone.name && (
                  <div className="description_cont">
                    <p className="description">{milestone.description}</p>
                    <button className="button__name" onClick={handleCloseModal}>
                      Close
                    </button>
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
