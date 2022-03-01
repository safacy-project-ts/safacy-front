import React, { useState } from 'react';
import { View, Picker, Text, SafeAreaView, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DropBox = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '50', value: '50' },
    { label: '100', value: '100' },
    { label: '150', value: '150' },
  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        style={styles.picker}
        placeholder="select radius"
        listMode="FLATLIST"
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        min={0}
        max={3}
      />
    </View>
  );
};

export default DropBox;

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
  },
  picker: {
    zIndex: 10000,
    width: 300,
    height: 20,
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: 'white',
  },
});
