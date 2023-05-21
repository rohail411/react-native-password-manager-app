import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import WheelColorPicker from "react-native-wheel-color-picker";

const ColorPicker = ({ color, setColor }) => {
  return (
    <View style={styles.container}>
      <WheelColorPicker
        style={{ flex: 1 }}
        initialColor={color}
        onColorChange={setColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

ColorPicker.defaultProps = {
  color: "#000",
};

export default ColorPicker;
