import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function CategoryList({
  categories,
}: {
  categories: {
    id: number;
    category_name: string;
  }[];
}) {
  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F5F5F5",
            },
          ]}
          key={index}
        >
          <Text style={styles.buttonText}>{category.category_name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Arial",
    fontWeight: "600",
  },
});
