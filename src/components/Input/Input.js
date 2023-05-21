import React from "react";
import { StyleSheet, TextInput } from "react-native";

export default function Input({
  placeholder,
  onChangeText,
  value,
  secureTextEntry,
  onFocus,
  onBlur,
  customStyle,
  returnKeyType,
  ref,
  onSubmitEditing,
}) {
  return (
    <TextInput
      ref={ref}
      style={{ ...styles.input, ...customStyle }}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      secureTextEntry={secureTextEntry}
      onFocus={onFocus}
      onBlur={onBlur}
      returnKeyType={returnKeyType}
      onSubmitEditing={onSubmitEditing}
      autoCapitalize="none"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 8,
    minWidth: "80%",
    borderRadius: 5,
  },
});
