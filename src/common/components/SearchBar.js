import React from 'react';
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const SearchBar = () => {
  return (
    <View style={{ width: 300, height: 50 }}>
      <GooglePlacesAutocomplete
        fetchDetails
        placeholder="Search"
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        query={{
          key: 'my-api-key-here',
          language: 'en',
        }}
        listViewDisplayed="auto"
      />
    </View>
  );
};

export default SearchBar;
