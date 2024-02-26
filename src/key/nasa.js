const fetchJson = (...args) => fetch(...args).then((r) => r.json());

const API_KEY = "XqM2eyZuT80TEP3dV7AvLfHdMiR9dfVmQzWNLCxH";


// Function to search for images from Mars rovers.
export const searchRoverImages = (rover, earth_date, camera) => {
    return fetchJson(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover.toLowerCase()}/photos?earth_date=${encodeURIComponent(earth_date)}&api_key=${API_KEY}${camera.length ? `&camera=${encodeURIComponent(camera)}` : ""}`);
};


// Function to search for images based on the provided date, selected rover, and camera.
// It filters the active rover selections, calls 'searchRoverImages' for each, and returns a promise that resolves when all fetch calls are complete.
export const searchImages = ({earth_date, roverSelection, camera}) => {
    const promises = Object.entries(roverSelection)
        .filter(([_, value]) => value) // Filter out unselected rovers.
        .map(([key, _]) => searchRoverImages(key, earth_date,camera)); // Map over selected rovers to create a promise for each fetch call.
    return Promise.all(promises);// Use Promise.all to wait for all the promises to resolve and return the combined result.
};