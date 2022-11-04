import { getDistance } from "geolib";

const distanceController = (
  currentLat,
  currentLng,
  destinationLat,
  destinationLng,
) => {
  const distance = getDistance(
    { latitude: currentLat, longitude: currentLng },
    { latitude: destinationLat, longitude: destinationLng },
  );
  return distance;
};

export default distanceController;
