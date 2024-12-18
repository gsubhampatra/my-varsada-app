// ProductCard2.tsx
import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  image: {
    width: 113,
    height: 158,
    resizeMode: "cover",
  },
  textContainer: {
    padding: 16,
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  price: {
    fontSize: 14,
  },
});

export default function ProductCard2({
  img = "",
  name,
  price,
  id,
}: {
  img: string;
  name: string;
  price: string;
  id: number;
}) {
  return (
    <Link href={`/product?productId=${id}`}>
      <View style={styles.container}>
        <Image source={{ uri: img }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>Rs {price}</Text>
        </View>
      </View>
    </Link>
  );
}