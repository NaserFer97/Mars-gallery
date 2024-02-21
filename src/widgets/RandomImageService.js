const getRandomImageUrl = async () => {
  var url = "https://api.nasa.gov/planetary/apod?api_key=";
  var api_key = "KWSnE8BckEXzUXjPLa9Noxg0w72bi5QJhukYqFzW";
  let data;
  try {
    const response = await fetch(`${url}${api_key}`);
    data = await response.json();
  } catch (error) {
    console.log(error);
    data = {};
  }
  
  return data.hdurl;
};

export default getRandomImageUrl;
