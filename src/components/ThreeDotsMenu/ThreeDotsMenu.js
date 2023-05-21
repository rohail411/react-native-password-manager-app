import React from "react";
import { View } from "react-native";
import { Menu, Divider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function ThreeDotsMenu() {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleMenuItem = (route, routeName) => {
    closeMenu();
    navigation[route](routeName);
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Menu
        contentStyle={{ backgroundColor: "#eee" }}
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Ionicons
            name="ellipsis-vertical"
            size={24}
            color="#fff"
            style={{ marginRight: 15 }}
            onPress={openMenu}
          />
        }
      >
        <Menu.Item
          onPress={() => handleMenuItem("push", "Settings")}
          title="Settings"
        />
        <Divider />
        <Menu.Item
          onPress={() => handleMenuItem("replace", "Login")}
          title="Exit"
        />
      </Menu>
    </View>
  );
}

export default ThreeDotsMenu;
