import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import { GColors } from "../constants/GStyles";

const RootLayout = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={GColors.primary} />
      <Stack initialRouteName="login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
};

export default RootLayout;
