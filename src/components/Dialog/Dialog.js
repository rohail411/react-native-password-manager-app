import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import Dialog from "react-native-dialog";

const DialogUI = ({ visibility, setDialogVisibility, children }) => {
  const [dialogVisible, setDialogVisible] = useState(false);

  const showDialog = () => {
    setDialogVisible(true);
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };

  const handleDelete = () => {
    // Handle delete logic here
    setDialogVisible(false);
  };

  return (
    <View style={styles.container}>
      <Dialog.Container visible={visibility}>{children}</Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export default DialogUI;
