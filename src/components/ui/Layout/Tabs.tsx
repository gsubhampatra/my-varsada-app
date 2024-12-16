import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { usePathname, Tabs, useNavigation, router } from "expo-router";
import { Feather, MaterialIcons, Ionicons } from "@expo/vector-icons";

type TabItem = {
  href: string;
  label: string;
  icon: string; // Feather or Material icon name
  iconType: "feather" | "material" | "ionicons";
};

const CustomTabs = () => {
  const pathname = usePathname();

  const tabItems: TabItem[] = [
    { href: "/home", label: "Home", icon: "home", iconType: "feather" },
    {
      href: "/category",
      label: "Categories",
      icon: "apps",
      iconType: "material",
    },
    {
      href: "/checkout",
      label: "Varsada Bag",
      icon: "shopping-bag",
      iconType: "feather",
    },
    { href: "/profile", label: "Profile", icon: "user", iconType: "feather" },
  ];

  return (
    <View style={styles.tabContainer}>
      {tabItems.map((tab, index) => {
        const isActive = pathname === tab.href;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              router.push(tab.href);
            }}
            style={styles.tabItem}
          >
            <View style={styles.iconContainer}>
              {tab.iconType === "feather" ? (
                <Feather
                  name={tab.icon}
                  size={24}
                  color={isActive ? "#C473FF" : "#1C1B1F"}
                />
              ) : (
                <MaterialIcons
                  name={tab.icon}
                  size={24}
                  color={isActive ? "#C473FF" : "#1C1B1F"}
                />
              )}
              {tab.iconType === "ionicons" ? (
                <Ionicons
                  name={tab.icon}
                  size={24}
                  color={isActive ? "#C473FF" : "#1C1B1F"}
                />
              ) : null}
            </View>
            <Text
              style={[styles.tabLabel, isActive ? styles.activeTabLabel : null]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export const TabBar = () => {
  return (
    <View style={{ position: "absolute", bottom: 0, width: "100%", zIndex: 100 }}>
      <CustomTabs />
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    zIndex: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F8EDEB",
    paddingVertical: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 5,
  },
  iconContainer: {
    marginBottom: 5,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1C1B1F",
  },
  activeTabLabel: {
    color: "#C473FF",
  },
});
