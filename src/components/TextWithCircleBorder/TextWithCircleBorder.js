import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TextWithCircleBorder = ({ title, circleStyle, textStyle }) => {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.circle, ...circleStyle }}>
        <Text style={{ ...styles.text, ...textStyle }}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 5,
  },
  circle: {
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ccc",
  },
});

export default TextWithCircleBorder;
