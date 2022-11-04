import axios from "axios";

const mapBoxAPI = async (
  currentLng,
  currentLat,
  destinationLng,
  destinationLat,
  setTotalDistance,
  setDestinationLocation,
) => {
  try {
    const res = await axios(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${currentLng},${currentLat};${destinationLng},${destinationLat}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`,
    );

    const coords = res.data.routes[0].geometry.coordinates.map((item) => {
      return { latitude: item[1], longitude: item[0] };
    });

    setDestinationLocation(coords);
    setTotalDistance(res.data.routes[0].distance);
  } catch (error) {
    console.log(error);
  }
};

export default mapBoxAPI;
