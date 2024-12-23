import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import SideDrawer from "./SideDrawer";

const MainNav = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={openDrawer} style={styles.menuIcon}>
        <Entypo name="menu" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.logo}>VARSADA</Text>
      <View style={styles.navIcons}>
        <Link href="/search-list">
          <TouchableOpacity >
            <Ionicons name="search-outline" size={24} color="black" />
          </TouchableOpacity>
        </Link>
        <Link href="/checkout">
          <TouchableOpacity>
            <Ionicons name="cart-outline" size={24} color="black" />
          </TouchableOpacity>
        </Link>
        <Link href="/profile">
          <TouchableOpacity>
            <Ionicons name="person-outline" size={24} color="black" />
          </TouchableOpacity>
        </Link>
      </View>
      <SideDrawer isVisible={isDrawerOpen} onClose={closeDrawer}>
        <Link href="/profile">
          <Text style={styles.sideDrawerLink}>Profile</Text>
        </Link>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.sideDrawerLink}>Logout</Text>
        </TouchableOpacity>
        <Link href="/order">
          <Text style={styles.sideDrawerLink}>Orders</Text>
        </Link>
        <Link href="/search-list">
          <Text style={styles.sideDrawerLink}>Products</Text>
        </Link>
        <Link href="/dream-list">
          <Text style={styles.sideDrawerLink}>Dream List</Text>
        </Link>
        <Link href="/coin-activity">
          <Text style={styles.sideDrawerLink}>Coins</Text>
        </Link>
      </SideDrawer>
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
    backgroundColor: "white",
  },
  menuIcon: {
    padding: 5,
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
  sideDrawerLink: {
    padding: 10,
    color: "black",
  },
});

export default MainNav;
