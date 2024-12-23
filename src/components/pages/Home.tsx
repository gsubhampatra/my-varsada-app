import React from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import BestSeller from "../ui/Home/BestSeller";
import Carousel from "../ui/Home/Carousel";
import CategoryBox from "../ui/Home/CategorySection";
import OfferBanner from "../ui/Home/OfferBanner";
import Trending from "../ui/Home/Trending";

import { useUserStore } from "../../store/useStore";
import { useFocusEffect, router } from "expo-router";
import SearchBar from "../ui/Home/SearchBar";

export default function Home() {
  const { isLogedIn, isLoginSkipped } = useUserStore();

  useFocusEffect(
    React.useCallback(() => {
      if (!isLogedIn && !isLoginSkipped) {
        router.push("/login");
      }
    }, [isLogedIn, isLoginSkipped])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchBar placeholder="Search" value="" onChangeText={() => {}} />
      <ScrollView style={styles.container}>
        <Carousel />
        <CategoryBox />
        <Trending />
        <OfferBanner />
        <BestSeller />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8EDEB",
    paddingHorizontal: 10,
  },
  loadingContainer: {
    minHeight: 400,
    justifyContent: "center",
    alignItems: "center",
  },
});
