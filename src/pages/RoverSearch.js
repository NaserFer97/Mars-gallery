import React, { useEffect } from "react";
import "./RoverSearch.css";
import DateSlider from "../widgets/DateSlider";
import RoverSelector from "../widgets/RoverSelector";
import CameraSelection from "../widgets/CameraSelection";
import { isActive } from "../services/sols";

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

  useEffect(() => {
    const handleScroll = () => {
      const parallaxElement = document.querySelector(".App-header");
      const offset = window.pageYOffset;
      parallaxElement.style.backgroundPositionY = `calc(50% - ${window.pageYOffset * 0.5}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const setCriteriaAndPublish = (newCriteria) => {
    const merged = { ...props, ...newCriteria };
    onCriteriaChange(merged);
    onSearch(merged);
  };

  const roversActive = rovers.reduce((acc, curr) => {
    acc[curr.name.toLowerCase()] = isActive(
      curr.activePeriod[0],
      curr.activePeriod[1],
      earth_date
    );
    return acc;
  }, {});

  return (
    <div>
      <header className="App-header">
        <h2>Mars Rover Images</h2>
      </header>
      <div className="container-fluid App-form">
        <div className="row">
          <form className="col-10 offset-1">
            <DateSlider
              earth_date={earth_date}
              onDateChanged={(date) => {
                setCriteriaAndPublish({ earth_date: date });
              }}
            />
            <RoverSelector
              roversActive={roversActive}
              rovers={rovers}
              roverSelection={roverSelection}
              onRoverSelection={(selected) => {
                setCriteriaAndPublish({ roverSelection: selected });
              }}
            />
            <CameraSelection
              camera={camera}
              cameras={cameras}
              onCameraSelected={(selectedCamera) => {
                setCriteriaAndPublish({ camera: selectedCamera });
              }}
            />
          </form>
        </div>
        <div className="row">
          <div className="col-10 offset-1">
            <div className="row">
              {photos.length === 0 ? (
                <p>No results</p>
              ) : (
                photos.map((photo) => (
                  <div key={photo.id} className="col-lg-4 col-12">
                    <img
                      className="App-img-result"
                      src={photo.img_src}
                      alt="Mars"
                      data-testid="rover-image"
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoverSearch;
