const fetchJson = (...args) => fetch(...args).then((r) => r.json());

const API_KEY = "XqM2eyZuT80TEP3dV7AvLfHdMiR9dfVmQzWNLCxH";

export const searchRoverImages = (rover, earth_date, camera) => {
    return fetchJson(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover.toLowerCase()}/photos?earth_date=${encodeURIComponent(earth_date)}&api_key=${API_KEY}${camera.length ? `&camera=${encodeURIComponent(camera)}` : ""}`);
};

export const searchImages = ({earth_date, roverSelection, camera}) => {
    const promises = Object.entries(roverSelection)
        .filter(([_, value]) => value)
        .map(([key, _]) => searchRoverImages(key, earth_date,camera));
    return Promise.all(promises);
};