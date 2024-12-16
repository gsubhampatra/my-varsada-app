import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import CoinCredited from "../ui/coinActivity/CoinCredited";
import CoinsReedemed from "../ui/coinActivity/CoinsReedemed";

import Tabs from "../ui/Layout/Tabs";
import NavBarMobile from "../ui/Layout/mobile/NavBarMobile";

export default function Wallet() {
  const Tab = [
    { name: "Credited", component: <CoinCredited /> },
    { name: "Debited", component: <CoinsReedemed /> },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavBarMobile />
      <View style={styles.container}>
        <Tabs />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 11,
    minHeight: "55%",
  },
});
