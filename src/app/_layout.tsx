import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import { GColors } from "../constants/GStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={GColors.primary} />
        <Stack initialRouteName="login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
        </Stack>
      </View>
    </QueryClientProvider>
  );
};

export default RootLayout;
