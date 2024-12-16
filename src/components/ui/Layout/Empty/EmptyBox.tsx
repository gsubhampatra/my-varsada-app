import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

type EmptyBoxProps = {
  text?: string;
};

export default function EmptyBox({ text = "No Data Found" }: EmptyBoxProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name="inbox" size={40} color="#00000088" />
      </View>
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  iconContainer: {
    opacity: 0.5,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#777",
  },
});
