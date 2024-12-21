import { router, Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Entypo, MaterialIcons, Feather } from "@expo/vector-icons";
import { GColors } from "@/src/constants/GStyles";
import Navbar from "@/src/components/Nav";

function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false, // to remove the labels, we manage it with custom text
        tabBarActiveTintColor: GColors.primary, // active tab icon color
        tabBarInactiveTintColor: GColors.grey, //inactive tab icon color
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={styles.tabItem}>
              <Entypo name="home" size={24} color={color} />
              <Text style={[styles.tabLabel, { color }]}>Home</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={styles.tabItem}>
              <MaterialIcons name="category" size={24} color={color} />
              <Text style={[styles.tabLabel, { color }]}>Categories</Text>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="checkout"
        options={{
          tabBarStyle: { display: "none" },
          headerShown: true,
          header: () => (
            <Navbar
              navText="Varsada Bag"
              navColor={GColors.primary}
              openDrawer={() => {router.back()}}
            />
          ),

          tabBarIcon: ({ color }) => (
            <View style={styles.tabItem}>
              <Feather name="shopping-bag" size={24} color={color} />
              <Text style={[styles.tabLabel, { color }]}>Varsada Bag</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={styles.tabItem}>
              <Feather name="user" size={24} color={color} />
              <Text style={[styles.tabLabel, { color }]}>Profile</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    paddingTop: 10,
  },
  tabItem: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  tabLabel: {
    fontSize: 12,
  },
});

export default TabLayout;
