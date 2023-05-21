import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Create from "./src/screens/Create";
import Settings from "./src/screens/Settings";
import ThreeDotsMenu from "./src/components/ThreeDotsMenu/ThreeDotsMenu";
import About from "./src/screens/About";
import { Provider } from "react-native-paper";
import ExportAndImport from "./src/screens/ExportAndImport";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <StatusBar backgroundColor="#00BCEB" />
        <Stack.Navigator initialRouteName={"Login"}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Passwords",
              headerStyle: {
                backgroundColor: "#00BCEB",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerRight: () => <ThreeDotsMenu />,
              // headerLeft: null,
            }}
          />
          <Stack.Screen
            name="Create"
            component={Create}
            options={(
              {
                /* navigation */
              }
            ) => ({
              title: "Create",
              headerStyle: {
                backgroundColor: "#00BCEB",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerRight: null,
            })}
          />

          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              title: "Settings",
              headerStyle: {
                backgroundColor: "#00BCEB",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerRight: null,
            }}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{
              title: "About",
              headerStyle: {
                backgroundColor: "#00BCEB",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerRight: null,
            }}
          />
          <Stack.Screen
            name="Export/Import"
            component={ExportAndImport}
            options={{
              title: "Export/Import",
              headerStyle: {
                backgroundColor: "#00BCEB",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerRight: null,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  logout: {
    marginHorizontal: 10,
  },
});
