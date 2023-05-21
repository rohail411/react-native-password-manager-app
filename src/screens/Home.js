import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Card from "../components/Card/Card";
import FloatingActionButton from "../components/FloatingActionButton/FloatingActionButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AES, enc } from "react-native-crypto-js";
import useScreenFocus from "../components/useScreenFocus/useScreenFocus";
import Input from "../components/Input/Input";
import EmptyScreen from "../components/EmptyScreen/EmptyScreen";

const secretKey = "password-manager-by-rohail-butt";

const Home = ({ navigation }) => {
  const [passwords, setPasswords] = useState([]);
  const [filteredPasswords, setFilteredPassword] = useState([]);
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState("");
  useScreenFocus(() => {
    getInitialData();
  });
  useEffect(() => {
    if (search) {
      const newPasswords = passwords.filter((password) =>
        password.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPassword(newPasswords);
    } else {
      setFilteredPassword([]);
    }
  }, [search]);
  const getInitialData = async () => {
    const data = await AsyncStorage.getItem("password-manager-secret-data");
    if (data) {
      const decryptedText = AES.decrypt(data, secretKey).toString(enc.Utf8);
      const parsedData = JSON.parse(decryptedText);
      setPasswords(Object.values(parsedData));
      setFilteredPassword([]);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {passwords.length === 0 ? (
        <EmptyScreen />
      ) : (
        <>
          <Input
            placeholder={"Search"}
            onFocus={() => setFocused("search")}
            onBlur={() => setFocused("")}
            customStyle={{
              borderColor: focused === "search" ? "#00BCEB" : "#ccc",
              marginHorizontal: 10,
            }}
            onChangeText={setSearch}
            value={search}
            returnKeyType="search"
          />

          <ScrollView style={styles.scrollView}>
            {(search ? filteredPasswords : passwords).map((item, i) => (
              <Card
                key={i}
                title={item.title}
                initialLetter={item.title.substring(0, 1)}
                data={item}
              />
            ))}
          </ScrollView>
        </>
      )}
      <FloatingActionButton onPress={() => navigation.navigate("Create")} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});

export default Home;
