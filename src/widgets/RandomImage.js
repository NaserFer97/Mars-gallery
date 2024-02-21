import React, { useState, useEffect } from "react";
import getRandomImageUrl from "./RandomImageService";

const RandomImage = () => {
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    const getUrl = async () => {
      if (!imgUrl) {
        const url = await getRandomImageUrl();
        setImgUrl(url);
      }
    };
    getUrl();
  }, [imgUrl]);
  //console.log(imgUrl);
  return (
    <div>
      {imgUrl ? (
        <img src={imgUrl} alt="Mars Rover" />
      ) : (
        <p>{imgUrl === "" ? "Missed" : "Loading"}</p>
      )}
    </div>
  );
};

export default RandomImage;
