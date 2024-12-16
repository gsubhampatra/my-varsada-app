import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

interface BannerProps {
  image: string;
  buttonText: string;
  link: string;
}

const OfferBanner = () => {
  const image = "https://images.unsplash.com/photo-1523207911344-6d8f6a99d3d0";

  const buttonText = "Shop Now";
  const link = "#";

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.overlay}></View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => console.log(link)}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 134,
    resizeMode: "contain", // or 'cover' based on desired behavior
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },
  buttonContainer: {
    backgroundColor: "#C473FF",
    position: "absolute",
    bottom: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default OfferBanner;
