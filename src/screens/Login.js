import React, { useState } from "react";
import { StyleSheet, View, Text, ToastAndroid } from "react-native";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AES, enc } from "react-native-crypto-js";
import { FontAwesome5 } from "@expo/vector-icons";
import * as yup from "yup";
import PasswordField from "../components/PasswordField/PasswordField";
import * as LocalAuthentication from "expo-local-authentication";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

const secretKey = "password-manager-by-rohail-butt";
const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(6).required(),
});

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [found, setFound] = useState(false);
  const [focused, setFocused] = useState("");

  React.useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      const data = await AsyncStorage.getItem("password-manager-login");
      if (data) {
        setFound(true);
      }
    } catch (error) {}
  };

  const handleLogin = async () => {
    const isValid = await schema.isValid({ username, password });
    if (!isValid) {
      ToastAndroid.show("Please fill input fields first", ToastAndroid.SHORT);
      return;
    }
    if (!found) {
      return signup();
    } else {
      try {
        const data = await AsyncStorage.getItem("password-manager-login");
        if (data) {
          const decryptedText = AES.decrypt(data, secretKey).toString(enc.Utf8);
          const parsedData = JSON.parse(decryptedText);
          if (
            parsedData.username === username &&
            parsedData.password === password
          ) {
            navigation.replace("Home");
          } else {
            ToastAndroid.show("Invalid Credentials", ToastAndroid.SHORT);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const signup = async () => {
    const plainText = JSON.stringify({ username, password });
    const secretKey = "password-manager-by-rohail-butt";

    const encryptedText = AES.encrypt(plainText, secretKey).toString();
    try {
      await AsyncStorage.setItem("password-manager-login", encryptedText);
      navigation.replace("Home");
    } catch (error) {
      console.log(error);
    }
  };
  const authenticate = async () => {
    try {
      const { success, error } = await LocalAuthentication.authenticateAsync();
      if (success) {
        navigation.replace("Home");
      } else {
        ToastAndroid.show(
          "Biometric authentication failed",
          ToastAndroid.SHORT
        );
      }
    } catch (error) {
      ToastAndroid.show("Something wrong", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <FontAwesome5 name="drafting-compass" size={60} color="#00BCEB" />
      </View>
      <Input
        customStyle={{
          borderColor: focused === "username" ? "#00BCEB" : "#ccc",
        }}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
        onFocus={() => setFocused("username")}
        onBlur={() => setFocused("")}
      />
      <PasswordField
        customStyle={{
          borderColor: focused === "password" ? "#00BCEB" : "#ccc",
          minWidth: "70%",
        }}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        onFocus={() => setFocused("password")}
        onBlur={() => setFocused("")}
      />
      <View style={styles.buttonContainer}>
        <Button onPress={handleLogin} text={found ? "Login" : "Signup"} />
        <TouchableOpacity style={styles.bioIcon} onPress={authenticate}>
          <MaterialCommunityIcons name="fingerprint" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bioIcon: {
    marginTop: 13,
    marginLeft: 20,
  },
});
