import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { GColors, Gstyles } from "../../constants/GStyles";
import Navbar from "@/src/components/Nav";
import SideDrawer from "@/src/components/SideDrawer";

const CategoryScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  const menuItems = [
    "New In",
    "Best Sellers",
    "Denim",
    "Crop Top",
    "Bodycon",
    "Formal Wear",
    "Winter wear",
    "Jumpsuit",
    "Blazers",
    "Dress",
  ];
  return (
    <View style={Gstyles.container}>
      <Navbar
        navText="Category"
        navColor={GColors.primary}
        openDrawer={openDrawer}
      />
      <SideDrawer isVisible={isDrawerOpen} onClose={closeDrawer}>
        <ScrollView>
          {menuItems.map((item, index) => (
            <TouchableOpacity style={styles.menuItem} key={index}>
              <Text style={styles.menuText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SideDrawer>
      <Text>CategoryScreen</Text>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  menuItem: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
