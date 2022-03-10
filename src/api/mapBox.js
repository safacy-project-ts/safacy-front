import axios from "axios";
import { MAPBOX_ACCESS_TOKEN } from "@env";

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
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${currentLng},${currentLat};${destinationLng},${destinationLat}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`,
    );

    const coords = res.data.routes[0].geometry.coordinates.map((item) => {
      // console.log("===========", res.data.routes[0]);
      return { latitude: item[1], longitude: item[0] };
    });

    setDestinationLocation(coords);
    setTotalDistance(res.data.routes[0].distance);
  } catch (error) {
    console.log(error);
  }
};

export default mapBoxAPI;
