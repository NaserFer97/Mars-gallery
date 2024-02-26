import React from 'react';
import './dateslider.css';
// Importing utility functions from the 'sols' service that help with date calculations.
import { firstDay, lastDay, dateToSol, solToDate, daysBetween } from '../services/sols';

const DateSlider = ({ earth_date, onDateChanged }) => {
    // Calculate the total number of days between the first and last day of the mission.
    const days = daysBetween(firstDay, lastDay);
    // Convert the current Earth date to the corresponding Martian sol.
    const sol = dateToSol(earth_date);

    // This function is called whenever the slider value changes.
    // It converts the sol back to an Earth date and triggers the onDateChanged event.
    function onSlide(event) {
        onDateChanged(solToDate(event.target.value));
    }

    return (
        <div className="Dateslider">
            <div className="row">
                <div className="col-12" style={{ textAlign: "center" }}>
                    {/* Displaying the label for the date slider */}
                    <label htmlFor="date">Earth Day</label>
                    {/* Displaying the currently selected Earth date */}
                    <p className="Dateslider-date" data-testid="date-label">{earth_date}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {/* The range input represents the slider, allowing the user to select a date
                        within the range of the mission's duration. */}
                    <input data-testid="date-slider"
                        type="range"
                        id="date"
                        className="form-control"
                        min="1"
                        max={days}
                        value={sol}
                        onChange={onSlide}
                    ></input>
                    {/* Displays the start and end dates of the mission below the slider */}
                    <div className="text-center mt-2">
                        <small className="small">{firstDay}</small>
                        <span className="mx-4">|</span>
                        <small className="small">{lastDay}</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DateSlider;
