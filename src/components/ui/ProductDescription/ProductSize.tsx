// ProductSize.tsx
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import ProductSizeBox from "./ProductSizeBox";
import ProductSizeGuideTable from "./ProductSizeGuideTable";
import { UseQueryResult } from "@tanstack/react-query";
import { Size } from "../../../types/ResponceTypes";
import SideDrawer from "../../../components/SideDrawer";
import { payload } from "../../../store/globalVars";
import SizeChartModal from "./ProductSizeGuideTable";


const sampleSizeData = {
    sizedata: [
        {
            size: "S",
            ProductSizeMeasurement: [
                { measurementType: { measurement_name: "chest" }, value: 34, unit: { unit: "in" } },
                { measurementType: { measurement_name: "chest" }, value: 34, unit: { unit: "in" } },
                { measurementType: { measurement_name: "chest" }, value: 34, unit: { unit: "in" } },
                { measurementType: { measurement_name: "waist" }, value: 28, unit: { unit: "in" } },
            ],
        },
        {
            size: "M",
            ProductSizeMeasurement: [
                { measurementType: { measurement_name: "chest" }, value: 38, unit: { unit: "in" } },
                { measurementType: { measurement_name: "chest" }, value: 38, unit: { unit: "in" } },
                { measurementType: { measurement_name: "chest" }, value: 38, unit: { unit: "in" } },
                { measurementType: { measurement_name: "waist" }, value: 32, unit: { unit: "in" } },
            ],
        },
        {
            size: "L",
             ProductSizeMeasurement: [
                { measurementType: { measurement_name: "chest" }, value: 42, unit: { unit: "in" } },
                { measurementType: { measurement_name: "chest" }, value: 42, unit: { unit: "in" } },
                { measurementType: { measurement_name: "chest" }, value: 42, unit: { unit: "in" } },
                { measurementType: { measurement_name: "waist" }, value: 36, unit: { unit: "in" } },
            ],
        },
        {
            size: "XL",
              ProductSizeMeasurement: [
                { measurementType: { measurement_name: "chest" }, value: 46, unit: { unit: "in" } },
                { measurementType: { measurement_name: "waist" }, value: 40, unit: { unit: "in" } },
                { measurementType: { measurement_name: "waist" }, value: 40, unit: { unit: "in" } },
                { measurementType: { measurement_name: "waist" }, value: 40, unit: { unit: "in" } },
            ],
        },
    ],
    sizeArr: ["S", "M", "L", "XL"]
}

export default function ProductSize() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
};

const handleCloseModal = () => {
    setIsModalOpen(false);
};
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Size</Text>
        <TouchableOpacity onPress={handleOpenModal}>
          <Text style={styles.buttonText}>Product Measurements</Text>
        </TouchableOpacity>

            <SizeChartModal
                sizeData={sampleSizeData.sizedata}
                open={isModalOpen}
                close={handleCloseModal}
            />
      </View>
     <ProductSizeBox sizes={sampleSizeData.sizeArr} payload={payload} />
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