import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React from "react";
import SearchBar from "@/src/components/ui/Home/SearchBar";
import Carousel from "@/src/components/ui/Home/Carousel";
import Category from "@/src/components/ui/Home/CategorySection";
import Trending from "@/src/components/ui/Home/Trending";
import OfferBanner from "@/src/components/ui/Home/OfferBanner";
import BestSeller from "@/src/components/ui/Home/BestSeller";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar placeholder="Search" value="" onChangeText={() => {}} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Carousel />
        <Category />
        <Trending />
        <OfferBanner />
        <BestSeller />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
