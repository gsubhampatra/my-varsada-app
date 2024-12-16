import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const ProductPage = () => {
  const { productId } = useLocalSearchParams();
  return (
    <View>
      <Text>ProductPage {productId}</Text>
    </View>
  );
};

export default ProductPage;

const styles = StyleSheet.create({});
