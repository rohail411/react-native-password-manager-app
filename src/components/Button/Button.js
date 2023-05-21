import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button({
  onPress,
  text,
  buttonStyle,
  buttonTextStyle,
}) {
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...buttonStyle }}
      onPress={onPress}
    >
      <Text style={{ ...styles.buttonText, ...buttonTextStyle }}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#00BCEB",
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
