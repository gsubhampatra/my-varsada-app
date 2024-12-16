import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import BestSeller from "../ui/Home/BestSeller";
import Carousel from "../ui/Home/Carousel";
import CategoryBox from "../ui/Home/CategorySection";
import OfferBanner from "../ui/Home/OfferBanner";
import Trending from "../ui/Home/Trending";
import { API_ROUTES } from "../../kv";
import api from "../../http/axiosconfig";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../../store/useStore";
import { useNavigation, useFocusEffect } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";
import ErrorBox from "../ui/Layout/Error/ErrorBox";
import NavBarMobile from "../ui/Layout/mobile/NavBarMobile";

interface Slide {
  image: string;
  heading: string;
  top_text: string;
  bottom_text: string;
  position: "start" | "center" | "end";
  button_text: string;
  link: string;
}

interface BannerData {
  status: boolean;
  banners: {
    banner_name: string;
    top_text: string;
    bottom_text: string;
    button_text: string;
    mediaUrl: string;
    mediaType: string;
    link: string;
    position: string;
  }[];
}

async function fetchSlides(): Promise<BannerData> {
  const res = await api.get(API_ROUTES.BANNER.GET);
  if (!res.status) throw new Error("Failed to load banners");
  return res.data;
}

export default function Home() {
  const [showMobileApp, setShowMobileApp] = useState(
    Dimensions.get("window").width < 768
  );
  const { isLogedIn, isLoginSkipped } = useUserStore();
  const navigation = useNavigation();
  const [slides, setSlides] = useState<Slide[] | null>(null);

  const { isLoading, error, data } = useQuery<BannerData>({
    queryKey: ["slides"],
    queryFn: fetchSlides,
    onSuccess: (data) => {
      const slidesData = data.banners.map((slide) => {
        return {
          image: slide.mediaUrl,
          heading: slide.banner_name,
          top_text: slide.top_text,
          bottom_text: slide.bottom_text,
          button_text: slide.button_text,
          link: slide.link,
          position: slide.position as "start" | "center" | "end",
        };
      });
      setSlides(slidesData);
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      if (!isLogedIn && !isLoginSkipped) navigation.navigate("/login");
    }, [isLogedIn, isLoginSkipped, navigation])
  );

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavBarMobile />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ErrorBox text="Failed to load content" />
        </View>
      </SafeAreaView>
    );
  }

  if (!isLogedIn && !isLoginSkipped) return null;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavBarMobile />
      <ScrollView style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#C473FF" />
          </View>
        ) : null}
        {slides && slides.length > 0 && (
          <Carousel slides={slides} interval={5000} />
        )}
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
