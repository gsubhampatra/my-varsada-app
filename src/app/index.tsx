import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Link, Redirect } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Index = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={indexStyle.container}>
        <Link style={indexStyle.button} href="/login">
          Login
        </Link>
        <Link style={indexStyle.button} href="/home">
          Home
        </Link>
        <Link style={indexStyle.button} href="/product/[productId]">
          Product
        </Link>
      </View>
    </QueryClientProvider>
  );
};

export default Index;

const indexStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
    padding: 20,
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});
