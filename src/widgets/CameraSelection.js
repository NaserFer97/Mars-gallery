import React from "react";
import "./roverselector.css";

// The RoverSelector component allows users to select which Mars rovers' data they want to view.
function RoverSelector({ roversActive, rovers, roverSelection, onRoverSelection }) {
  
  // onClick function toggles the selection state of a rover when its corresponding
  // UI element is clicked.
  const onClick = (roverName) => {
    onRoverSelection({
      ...roverSelection,
      [roverName]: !roverSelection[roverName],
    });
  };

  return (
    <div className="RoverSelector-container">
      {/* Map through the rovers array and create a card for each rover */}
      {rovers.map((rover) => (
        <div
          key={rover.name} // Unique key for each rover element, which is required by React
          // Conditional class assignment; if the rover is not active on the selected date, 
          // add the 'inactive' class, which is likely styled differently
          className={`RoverSelector-card ${roversActive[rover.name.toLowerCase()] ? "" : "inactive"}`}
          // Register the onClick handler for when the rover card is clicked
          onClick={() => onClick(rover.name.toLowerCase())}
        >
          <label className="RoverSelector-title">
            {/* Checkbox allows users to select or deselect a rover.
                It's checked state is bound to the roverSelection state */}
            <input
              type="checkbox"
              data-testid="rover-selected" // Test ID for testing purposes
              checked={roverSelection[rover.name.toLowerCase()]}
              onChange={() => {}} // Empty onChange because the checkbox is controlled by the onClick on the label
              // Stop the propagation to prevent the onClick on the label from being fired when the checkbox itself is clicked
              onClick={(e) => e.stopPropagation()}
            />
            {rover.name} {/* Display the rover's name */}
          </label>
          {/* Display the active period of the rover */}
          <div className="RoverSelector-period">
            <small>
              {rover.activePeriod[0]} - {rover.activePeriod[1]}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RoverSelector;
