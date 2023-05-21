import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Card = ({ initialLetter, title, data }) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Create", { data: data })}
    >
      <View style={styles.card}>
        <View style={styles.cardContainer}>
          <Text
            style={{
              ...styles.profilePic,
              ...(data.color ? { backgroundColor: data.color } : {}),
            }}
          >
            {initialLetter}
          </Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "red",
    textAlign: "center",
    verticalAlign: "middle",
    fontSize: 30,
    textTransform: "uppercase",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textTransform: "capitalize",
  },
  date: {},
});

export default Card;
