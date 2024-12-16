import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useUserStore } from "../../../../store/useStore";
import { Profile } from "@/src/assets/icons";

export default function PopoverProfile() {
  const { isLogedIn } = useUserStore();
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Profile />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{isLogedIn ? "userName" : "login"}</Text>
          <Text style={styles.text}>xyz@gmail.com</Text>
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  textContainer: {
    marginLeft: 16,
  },
  text: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 16,
  },
});
