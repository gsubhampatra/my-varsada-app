import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import ConfirmProduct from "../ui/Checkout/ConfirmProduct";

export default function Checkout() {
  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../../../assets/images/bg.webp")}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <Text style={styles.heading}>View Varsada Bag</Text>
        </View>
      </ImageBackground>
      <ScrollView style={styles.content}>
        <ConfirmProduct />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "600",
  },
  content: {
    paddingHorizontal: 16,
  },
});
