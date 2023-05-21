import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import Input from "../components/Input/Input";
import * as yup from "yup";
import Button from "../components/Button/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AES, enc } from "react-native-crypto-js";
import { copyToClipboard, generateUniqueId } from "../../utils/util";
import PasswordField from "../components/PasswordField/PasswordField";
import ColorPicker from "../components/WheelColorPicker/WheelColorPicker";
import DialogUI from "../components/Dialog/Dialog";
import { Ionicons } from "@expo/vector-icons";
import Dialog from "react-native-dialog";
import { StatusBar } from "expo-status-bar";
import TextWithCircleBorder from "../components/TextWithCircleBorder/TextWithCircleBorder";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const schema = yup.object().shape({
  title: yup.string().min(3).required(),
  username: yup.string().required(),
  password: yup.string().min(6).required(),
});
const secretKey = "password-manager-by-rohail-butt";

const Create = ({ navigation, route }) => {
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState("");
  const [updateData, setUpdateData] = useState(null);
  const [openColorDialog, setColorDialog] = useState(false);
  const [color, setColor] = useState("");
  useEffect(() => {
    if (route.params) {
      const { data } = route.params;
      setUpdateData(data);
      setTitle(data.title);
      setPassword(data.password);
      setUsername(data.username);
      setColor(data.color);
      navigation.setOptions({
        title: "Update",
        ...(data.color ? { headerStyle: { backgroundColor: data.color } } : {}),
      });
    }
  }, []);
  const handleSave = async () => {
    const isValid = await schema.isValid({ title, username, password });
    if (!isValid) {
      ToastAndroid.show("Please fill input fields first", ToastAndroid.SHORT);
      return;
    }
    const uniqueId = generateUniqueId();

    try {
      const data = await AsyncStorage.getItem("password-manager-secret-data");
      if (data) {
        const decryptedText = AES.decrypt(data, secretKey).toString(enc.Utf8);
        const parsedData = JSON.parse(decryptedText);
        let plainText = JSON.stringify({
          ...parsedData,
          [uniqueId]: {
            id: uniqueId,
            color,
            title,
            username,
            password,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        });
        if (updateData) {
          plainText = JSON.stringify({
            ...parsedData,
            [updateData.id]: {
              ...updateData,
              title,
              username,
              color,
              password,
              updatedAt: new Date().toISOString(),
            },
          });
        }
        saveDataToDatabase(plainText);
      } else {
        saveDataToDatabase(
          JSON.stringify({
            [uniqueId]: {
              id: uniqueId,
              title,
              color,
              username,
              password,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          })
        );
      }
    } catch (error) {}
  };

  const saveDataToDatabase = async (plainText) => {
    try {
      const encryptedText = AES.encrypt(plainText, secretKey).toString();
      await AsyncStorage.setItem("password-manager-secret-data", encryptedText);
      navigation.navigate("Home");
    } catch (error) {
      console.log("ERR", error);
    }
  };

  const handleDelete = async () => {
    try {
      const data = await AsyncStorage.getItem("password-manager-secret-data");
      if (data) {
        const decryptedText = AES.decrypt(data, secretKey).toString(enc.Utf8);
        const parsedData = JSON.parse(decryptedText);
        delete parsedData[updateData.id];
        saveDataToDatabase(JSON.stringify(parsedData));
      }
    } catch (error) {}
  };
  handleColorChange = (colorCode) => {
    setColor(colorCode);
    navigation.setOptions({
      headerStyle: { backgroundColor: colorCode },
    });
  };

  handleCopyToClipboard = async (text, toastTitle) => {
    const response = await copyToClipboard(text);
    if (response) {
      ToastAndroid.show(
        `${toastTitle} copied to clipboard`,
        ToastAndroid.SHORT
      );
    } else {
      ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color} />
      <DialogUI
        visibility={openColorDialog}
        setDialogVisibility={() => setColorDialog(false)}
      >
        <>
          <Dialog.Title>Select Color</Dialog.Title>
          <ColorPicker color={color} setColor={handleColorChange} />
          <View style={styles.dialogBtnContainer}>
            <Dialog.Button
              label="Cancel"
              onPress={() => setColorDialog(false)}
            />
            {color && (
              <Dialog.Button
                label="Done"
                onPress={() => setColorDialog(false)}
              />
            )}
          </View>
        </>
      </DialogUI>
      {/* <ColorPicker /> */}
      <View style={styles.titleContainer}>
        <Input
          placeholder={"Title"}
          onFocus={() => setFocused("title")}
          onBlur={() => setFocused("")}
          customStyle={{
            borderColor: focused === "title" ? "#00BCEB" : "#ccc",
          }}
          onChangeText={setTitle}
          value={title}
          returnKeyType="next"
        />
        <TouchableOpacity onPress={() => setColorDialog(true)}>
          {title && color ? (
            <TextWithCircleBorder
              textStyle={{ fontSize: 30, color: "#fff" }}
              circleStyle={{
                width: 40,
                height: 40,
                borderWidth: 0,
                backgroundColor: color,
              }}
              title={title.charAt(0).toUpperCase()}
            />
          ) : (
            <Ionicons
              name="brush"
              size={24}
              color="black"
              style={styles.brush}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Input
          placeholder={"Username"}
          onFocus={() => setFocused("username")}
          onBlur={() => setFocused("")}
          customStyle={{
            borderColor: focused === "username" ? "#00BCEB" : "#ccc",
          }}
          onChangeText={setUsername}
          value={username}
          returnKeyType="next"
        />
        <MaterialCommunityIcons
          style={styles.brush}
          name="content-copy"
          size={24}
          color="black"
          onPress={() => handleCopyToClipboard(username, "Username")}
        />
      </View>
      <View style={styles.passwordContainer}>
        <PasswordField
          placeholder={"Password"}
          onFocus={() => setFocused("password")}
          onBlur={() => setFocused("")}
          customStyle={{
            borderColor: focused === "password" ? "#00BCEB" : "#ccc",
          }}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          returnKeyType="done"
        />
        <MaterialCommunityIcons
          style={styles.brush}
          name="content-copy"
          size={24}
          color="black"
          onPress={() => handleCopyToClipboard(password, "Password")}
        />
      </View>
      <Button text={"Save"} onPress={handleSave} />
      {updateData && (
        <Button
          text={"Delete"}
          onPress={handleDelete}
          buttonStyle={styles.delBtn}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleChar: {
    marginHorizontal: 20,
    width: 50,
    height: 50,
    lineHeight: 50,
    backgroundColor: "red",
    borderRadius: 50,
    fontSize: 30,
  },
  container: {
    flex: 1,
    margin: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  delBtn: {
    backgroundColor: "red",
  },
  brush: {
    marginHorizontal: 10,
  },
  dialogBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5,
  },
});

export default Create;
