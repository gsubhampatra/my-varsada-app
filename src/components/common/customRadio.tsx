import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

const CustomRadio = ({
  checked,
  onPress,
}: {
  checked: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[styles.radioBase, checked && styles.radioChecked]}
    onPress={onPress}
  >
    {checked && <View style={styles.radioInner} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  radioBase: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
  },
  radioChecked: {
    backgroundColor: "#007bff",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "white",
  },
});

export default CustomRadio;
