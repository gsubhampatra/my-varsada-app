import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import { GColors } from "../constants/GStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductDescriptionProvider } from "../context/ProductDescriptionContext";
import PageNav from "../components/common/PageNav";
import MainNav from "../components/common/MainNav";

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductDescriptionProvider>
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor={GColors.primary} />
          <Stack
            initialRouteName="login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="login"
              options={{ headerShown: true, header: () => <MainNav /> }}
            />

            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="product/[id]"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="profile-details"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="dream-list" options={{ headerShown: false }} />
            <Stack.Screen
              name="search-list"
              options={{
                headerShown: true,
                header: () => <PageNav navText="Filter" />,
              }}
            />
            <Stack.Screen
              name="coin-activity"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="saved-address"
              options={{
                headerShown: true,
                header: () => <PageNav navText="Saved Address" />,
              }}
            />
            <Stack.Screen
              name="payment"
              options={{
                headerShown: true,
                header: () => <PageNav navText="Payment" />,
              }}
            />
            <Stack.Screen
              name="payment-success"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="order" options={{ headerShown: false }} />
            <Stack.Screen name="track-order" options={{ headerShown: false }} />
            <Stack.Screen
              name="versadawallet/index"
              options={{ headerShown: false }}
            />
          </Stack>
        </View>
      </ProductDescriptionProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
