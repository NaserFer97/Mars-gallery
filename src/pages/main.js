// Importing necessary React hooks and components, along with CSS styles
import React, { useState, useEffect } from "react";
import "./main.css";
import DateSlider from "../widgets/DateSlider";
import RoverSelector from "../widgets/RoverSelector";
import CameraSelection from "../widgets/CameraSelection";
import { isActive } from "../services/sols";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // Importing Lightbox styles

// RoverSearch component that takes props for various functionalities
function RoverSearch(props) {
  const {
    rovers,
    cameras,
    camera,
    roverSelection,
    earth_date,
    photos,
    onCriteriaChange,
    onSearch,
  } = props;

  // State for managing Lightbox visibility and selected photo index
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Effect hook to add parallax scrolling effect to the header
  useEffect(() => {
    const handleScroll = () => {
      const parallaxElement = document.querySelector(".App-header");
      if (parallaxElement) {
        parallaxElement.style.backgroundPositionY = `calc(50% - ${window.pageYOffset *
          0.5}px)`;
      }
    };

    // Attaching scroll event listener
    window.addEventListener("scroll", handleScroll);
    // Cleanup function to remove event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to merge criteria changes and initiate search
  const setCriteriaAndPublish = (newCriteria) => {
    const merged = { ...props, ...newCriteria };
    onCriteriaChange(merged);
    onSearch(merged);
  };

  // Determines active status for rovers based on the earth date
  const roversActive = rovers.reduce((acc, curr) => {
    acc[curr.name.toLowerCase()] = isActive(
      curr.activePeriod[0],
      curr.activePeriod[1],
      earth_date
    );
    return acc;
  }, {});

  // Function to handle image click to open Lightbox with selected photo
  const handleImageClick = (index) => {
    setPhotoIndex(index);
    setIsLightboxOpen(true);
  };

  // The main render function that displays the header, form selections, and images
  return (
    <div>
      <header className="App-header">
        <h2>Mars Rover Images</h2>
      </header>
      <div className="container-fluid App-form">
        <div className="row">
          {/* Form and selection components */}
          <form className="col-10 offset-1">
            <DateSlider
              earth_date={earth_date}x
              // onDateChanged is an event handler that updates the search criteria
              // with the new date selected from the DateSlider component
              onDateChanged={(date) =>
                setCriteriaAndPublish({ earth_date: date })
              }
            />

            <RoverSelector
              roversActive={roversActive}
              rovers={rovers}
              roverSelection={roverSelection}
              // onRoverSelection is an event handler that updates the search criteria
              // with the new rover selected from the RoverSelector component
              onRoverSelection={(selected) =>
                setCriteriaAndPublish({ roverSelection: selected })
              }
            />

            <CameraSelection
              camera={camera}
              cameras={cameras}
              // onCameraSelected is an event handler that updates the search criteria
              // with the new camera selected from the CameraSelection component
              onCameraSelected={(selectedCamera) =>
                setCriteriaAndPublish({ camera: selectedCamera })
              }
            />
          </form>
        </div>
        <div className="row">
          <div className="col-10 offset-1">
            <div className="row">
              {/* Displaying results, if no photos are available, show a message */}
              {photos.length === 0 ? (
                <p>No results</p>
              ) : (
                photos.map((photo, index) => (
                  // Clickable image that will open the Lightbox
                  <div
                    key={photo.id}
                    className="col-lg-4 col-12"
                    onClick={() => handleImageClick(index)}
                  >
                    <img
                      className="App-img-result"
                      src={photo.img_src}
                      alt="Mars"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Lightbox component for viewing and navigating photos */}
      {isLightboxOpen && (
        <Lightbox
          mainSrc={photos[photoIndex].img_src}
          nextSrc={photos[(photoIndex + 1) % photos.length].img_src}
          prevSrc={
            photos[(photoIndex + photos.length - 1) % photos.length].img_src
          }
          onCloseRequest={() => setIsLightboxOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + photos.length - 1) % photos.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % photos.length)
          }
        />
      )}
    </div>
  );
}

export default RoverSearch;
