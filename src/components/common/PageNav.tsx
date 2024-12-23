import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GColors } from "@/src/constants/GStyles";

interface Prop {
  navText: string;
}

const PageNav = ({ navText }: Prop) => {
  return (
    <View style={[styles.navBar, { backgroundColor: GColors.primary }]}>
      <TouchableOpacity onPress={() => router.back()}>
        <AntDesign name="left" size={24} color="white" />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 24,
          color: "white",
          textDecorationLine: "none",
        }}
      >
        {navText}
      </Text>
      <View style={styles.navIcons}>
        <Link href="/search-list">
          <TouchableOpacity onPress={() => router.push("/search-list")}>
            <Ionicons name="search-outline" size={24} color={"white"} />
          </TouchableOpacity>
        </Link>
        <Link href="/checkout">
          <TouchableOpacity>
            <Ionicons name="cart-outline" size={24} color={"white"} />
          </TouchableOpacity>
        </Link>
        <Link href="/profile">
          <TouchableOpacity>
            <Ionicons name="person-outline" size={24} color={"white"} />
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

export default PageNav;
