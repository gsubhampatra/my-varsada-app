import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

type ErrorBoxProps = {
  text?: string;
  onTryAgain?: () => void;
};

export default function ErrorBox({
  text = "There are some problems with your operation.",
  onTryAgain,
}: ErrorBoxProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name="alert-triangle" size={50} color="#ff9800" />
      </View>
      <Text style={styles.title}>{text}</Text>
      {onTryAgain && (
        <TouchableOpacity style={styles.button} onPress={onTryAgain}>
          <Text style={styles.buttonText}>Try again</Text>
        </TouchableOpacity>
      )}
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ff9800",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#ff9800",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
