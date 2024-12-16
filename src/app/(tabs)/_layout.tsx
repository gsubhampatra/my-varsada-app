import { TabBar } from "@/src/components/ui/Layout/Tabs";
import { Tabs } from "expo-router";
import React from "react";

function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
      tabBar={TabBar}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="category" />
      <Tabs.Screen name="checkout" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

export default TabLayout;
