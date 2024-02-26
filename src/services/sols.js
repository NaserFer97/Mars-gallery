import moment from 'moment';

//  first and last days of the Mars Rover mission
export const [firstDay, lastDay] = ["2004-01-05", "2019-09-28"];
// Define a constant for the date format to be used throughout the application
export const dateFormat = "YYYY-MM-DD";

// Convert an Earth date to a Martian sol (a Martian day).
// Mars sols are counted from the first day of the mission.
export const dateToSol = (date) => 
  moment(date, dateFormat).diff(moment(firstDay, dateFormat), 'days') + 1;

// Convert a Martian sol back to an Earth date.
// Adds the number of sols to the first day of the mission to calculate the date.
export const solToDate = (sol) => 
  moment(firstDay, dateFormat).add(sol - 1, 'days').format(dateFormat);

// Calculate the number of days between two dates.
export const daysBetween = (startDate, lastDate) => 
  moment(lastDate, dateFormat).diff(moment(startDate, dateFormat), 'days') + 1;

// Determine if a selected date is within a given active date range.
// This is to check if a rover was active on a certain date.
export const isActive = (rangeStart, rangeEnd, selected) => {
    const fromMoment = moment(rangeStart, dateFormat);
    const toMoment = moment(rangeEnd, dateFormat);
    const selectedMoment = moment(selected, dateFormat);
    return selectedMoment >= fromMoment && selectedMoment <= toMoment;
};
