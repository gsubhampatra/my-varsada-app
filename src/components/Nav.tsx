import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface Prop {
  openDrawer: () => void;
  navText: string;
  navColor: string;
}
const Navbar = ({
  openDrawer,
  navText = "VARSADA",
  navColor = "white",
}: Prop) => {
  var textColor = "black";
  if (navColor !== "white") {
    textColor = "white";
  }
  return (
    <View style={[styles.navBar, { backgroundColor: navColor }]}>
      <TouchableOpacity onPress={openDrawer}>
        <Ionicons name="menu-outline" size={30} color={textColor} />
      </TouchableOpacity>
      <Link href="/" style={styles.logo}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: textColor }}>
          {navText}
        </Text>
      </Link>
      <View style={styles.navIcons}>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} color={textColor} />
        </TouchableOpacity>
        <Link href="/checkout">
          <TouchableOpacity>
            <Ionicons name="cart-outline" size={24} color={textColor} />
          </TouchableOpacity>
        </Link>
        <Link href="/profile">
          <TouchableOpacity>
            <Ionicons name="person-outline" size={24} color={textColor} />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  navIcons: {
    flexDirection: "row",
    gap: 10,
  },
});

export default Navbar;
