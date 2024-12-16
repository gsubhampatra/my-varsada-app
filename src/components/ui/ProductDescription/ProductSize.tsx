import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import ProductSizeBox from "./ProductSizeBox";
import ProductSizeGuideTable from "./ProductSizeGuideTable";
import { UseQueryResult } from "@tanstack/react-query";
import { Size } from "../../../types/ResponceTypes";
import SideDrawer from "../../../components/SideDrawer";
import { payload } from "../../../store/globalVars";

export default function ProductSize({
  size,
}: {
  size: UseQueryResult<{
    sizedata: Size[];
    sizeArr: string[];
  }>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Size</Text>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Text style={styles.buttonText}>Product Measurements</Text>
        </TouchableOpacity>

        <SideDrawer isVisible={open} onClose={() => setOpen(false)}>
          <View style={styles.drawerContent}>
            {size?.data ? (
              <ProductSizeGuideTable sizedata={size?.data?.sizedata} />
            ) : null}
          </View>
        </SideDrawer>
      </View>

      {size?.data?.sizeArr ? (
        <ProductSizeBox sizes={size?.data?.sizeArr} payload={payload} />
      ) : (
        <Text>Loading..</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "normal",
  },
  buttonText: {
    color: "#1a73e8",
  },
  drawerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
});
