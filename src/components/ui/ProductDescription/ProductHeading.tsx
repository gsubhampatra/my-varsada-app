// ProductHeading.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GColors } from "@/src/constants/GStyles";

export default function ProductHeading({ text }: { text?: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{text}</Text>
      <View style={styles.iconsContainer}>
        <Ionicons name="heart-outline" size={24} color={GColors.primary} />
        <Ionicons name="share-outline" size={24} color={GColors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 16,
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
    },
    iconsContainer: {
        flexDirection: "row",
        gap: 8,
    },
});