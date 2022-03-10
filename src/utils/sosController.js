const sosController = (latitude, longitude) => {
  return `<SOS -  현재 친구 위치>
    ► 위도: ${latitude}
    ► 경도: ${longitude}
    도와주세요!`;
};

export default sosController;
