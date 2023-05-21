import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
const Settings = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item}>
        <MaterialIcons
          name="format-paint"
          size={24}
          color="black"
          style={styles.icon}
        />
        <Text style={styles.itemText}>Appearance</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <MaterialCommunityIcons
          name="database"
          size={24}
          color="black"
          style={styles.icon}
        />
        <Text style={styles.itemText}>Database</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.push("Export/Import")}
      >
        <MaterialIcons
          name="import-export"
          size={24}
          color="black"
          style={styles.icon}
        />
        <Text style={styles.itemText}>Export/Import</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <MaterialCommunityIcons
          name="security"
          size={24}
          color="black"
          style={styles.icon}
        />
        <Text style={styles.itemText}>Security</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.push("About")}
      >
        <AntDesign
          name="exclamationcircleo"
          size={24}
          color="black"
          style={styles.icon}
        />
        <Text style={styles.itemText}>About</Text>
      </TouchableOpacity>
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
});

export default Settings;
