import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { GOOGLE_MAP_API } from "@env";
import PropTypes from "prop-types";

import { setUserDestination } from "../../store/locationSlice";

import COLORS from "../constants/COLORS";
import FONTS from "../constants/FONT";

const SearchBar = ({ setDestination, setUserDestination }) => {
  const dispatch = useDispatch();

  const { userDestination } = useSelector((state) => state.location);

  return (
    <GooglePlacesAutocomplete
      placeholder="Search your destination"
      minLength={2}
      debounce={150}
      isFocuse
      enablePoweredByContainer
      fetchDetails
      onPress={(data, details = null) => {
        setDestination(data.structured_formatting.main_text);
        setUserDestination({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
        });
      }}
      GooglePlacesSearchQuery={{
        rankby: "distance",
      }}
      query={{
        key: GOOGLE_MAP_API,
        language: "ko",
      }}
      styles={{
        container: {
          zIndex: 1,
        },
        textInputContainer: {
          width: "100%",
          borderBottomColor: COLORS.LIGHT_BLACK,
          borderBottomWidth: 1,
        },
        textInput: {
          height: 30,
          color: COLORS.LIGHT_BLACK,
          fontSize: 13,
          fontFamily: FONTS.REGULAR_FONT,
        },
        listView: {
          width: "90%",
          zIndex: 20,
        },
        row: { height: 35 },
        description: { fontSize: 10, color: COLORS.SEARCHBAR_DESCRIPRION },
      }}
    />
  );
};
export default SearchBar;

SearchBar.propTypes = {
  setDestination: PropTypes.func.isRequired,
  setUserDestination: PropTypes.func.isRequired,
};
