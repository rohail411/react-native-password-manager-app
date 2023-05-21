import AsyncStorage from "@react-native-async-storage/async-storage";
import { AES, enc } from "react-native-crypto-js";
import * as Clipboard from "expo-clipboard";

const secretKey = "password-manager-by-rohail-butt";

function generateUniqueId() {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomString}`;
}

async function getDataFromLocalStorage(key) {
  const data = await AsyncStorage.getItem(key);
  if (data) {
    const decryptedText = AES.decrypt(data, secretKey).toString(enc.Utf8);
    const parsedData = JSON.parse(decryptedText);
    return Object.values(parsedData);
  }
  return false;
}

async function saveDataToDatabase(key, plainText) {
  try {
    const encryptedText = AES.encrypt(plainText, secretKey).toString();
    await AsyncStorage.setItem(key, encryptedText);
    return true;
  } catch (error) {
    return false;
  }
}

async function copyToClipboard(text) {
  return new Promise(async (resolve) => {
    try {
      await Clipboard.setStringAsync(text);
      resolve(true);
    } catch (error) {
      console.log(error);
      resolve(false);
    }
  });
}

export {
  generateUniqueId,
  getDataFromLocalStorage,
  saveDataToDatabase,
  copyToClipboard,
};
