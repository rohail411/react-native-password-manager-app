import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TextWithCircleBorder from "../TextWithCircleBorder/TextWithCircleBorder";

const EmptyScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <TextWithCircleBorder
            title="B"
            circleStyle={styles.upperTextB}
            textStyle={styles.textB}
          />
        </View>
        <View>
          <TextWithCircleBorder title="A" />
          <TextWithCircleBorder
            title="C"
            circleStyle={styles.upperTextC}
            textStyle={styles.textC}
          />
        </View>
      </View>
      <Text style={styles.text}>No content to display</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  upperTextA: {
    fontWeight: "bold",
    padding: 15,
    fontSize: 40,
    color: "#ccc",
    borderColor: "red",
    borderRadius: 50,
    borderWidth: 1,
    margin: 5,
  },
  upperTextB: {
    borderColor: "green",
    width: 70,
    height: 70,
  },
  textB: {
    fontSize: 30,
  },
  upperTextC: {
    borderColor: "#00BCEB",
    width: 60,
    height: 60,
  },
  textC: {
    fontSize: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ccc",
  },
});

export default EmptyScreen;
