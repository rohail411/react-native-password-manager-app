import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Input from "../Input/Input";

// TODO: Will work again on this component
const InputWithDynamicIcon = ({ icon: IconComponent, ...rest }) => {
  console.log(rest);
  return (
    <View style={{ ...styles.container, ...rest.customStyle }}>
      <Input {...rest} customStyle={styles.input} />
      {IconComponent && IconComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 8,
    minWidth: "80%",
    borderRadius: 5,
    padding: 0,
    backgroundColor: "orange",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "transparent",
    minWidth: "80%",
  },
  icon: {
    marginLeft: 8,
  },
});

export default InputWithDynamicIcon;
