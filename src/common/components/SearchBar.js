import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAP_API } from "@env";

import { setUserDestination } from "../../store/locationSlice";

import COLORS from "../constants/COLORS";

const SearchBar = ({ setDestination }) => {
  const dispatch = useDispatch();

  const { userDestination } = useSelector((state) => state.location);

  return (
    <GooglePlacesAutocomplete
      placeholder="Destination"
      minLength={2}
      debounce={150}
      isFocuse
      enablePoweredByContainer
      fetchDetails
      onPress={(data, details = null) => {
        setDestination(data.structured_formatting.main_text);
        dispatch(
          setUserDestination({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          }),
        );
      }}
      byPlacesAPI="GooglePlacesSearch"
      GooglePlacesSearchQuery={{
        rankby: "distance",
      }}
      query={{
        key: GOOGLE_MAP_API,
        language: "ko",
      }}
      styles={{
        container: {
          height: "100%",
          zIndex: 1,
        },
        textInputContainer: {
          width: "90%",
        },
        textInput: {
          height: 38,
          color: "#5d5d5d",
          fontSize: 13,
          borderRadius: 10,
          paddingLeft: 20,
        },
        listView: {
          width: "90%",
          zIndex: 20,
          backgroundColor: COLORS.GREY,
        },
        row: { height: 35 },
        description: { fontSize: 10, color: "#5d5d5d" },
        // predefinedPlacesDescription: {
        //   color: "red",
        // },
      }}
    />
  );
};
export default SearchBar;

SearchBar.propTypes = {
  setDestination: PropTypes.func.isRequired,
};
