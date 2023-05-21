import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
const About = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item}>
        <View style={styles.icon} />
        <Text style={styles.itemText}>Report a bug</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <View style={styles.icon} />
        <Text style={styles.itemText}>Rate a review</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <View style={styles.icon} />
        <Text style={styles.itemText}>More apps</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <View style={styles.icon} />
        <Text style={styles.itemText}>Tell your friends</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <View style={styles.icon} />
        <Text style={styles.itemText}>Translations</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <View style={styles.icon} />
        <Text style={styles.itemText}>Terms and Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <View style={styles.icon} />
        <Text style={styles.itemText}>Open Source licenses</Text>
      </TouchableOpacity>
      <View style={styles.item}>
        <View style={styles.icon} />
        <View>
          <Text style={styles.itemTextDisable}>Build version</Text>
          <Text style={styles.itemTextDisable}>1.0.0</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginVertical: 5,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  itemTextDisable: {
    color: "#ccc",
    fontSize: 16,
  },
});

export default About;
