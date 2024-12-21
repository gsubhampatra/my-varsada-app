import { Gstyles } from "@/src/constants/GStyles";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
} from "react-native";

const { height } = Dimensions.get("window");

const sampleSizeData = [
  {
    size: "S",
    ProductSizeMeasurement: [
      { measurementType: { measurement_name: "chest" }, value: "34" },
      { measurementType: { measurement_name: "waist" }, value: "28" },
      { measurementType: { measurement_name: "hip" }, value: "36" },
      { measurementType: { measurement_name: "length" }, value: "25" },
    ],
  },
  {
    size: "M",
    ProductSizeMeasurement: [
      { measurementType: { measurement_name: "chest" }, value: "36" },
      { measurementType: { measurement_name: "waist" }, value: "30" },
      { measurementType: { measurement_name: "hip" }, value: "38" },
      { measurementType: { measurement_name: "length" }, value: "26" },
    ],
  },
  // Add more sample data if needed
];

const SizeChartModal = ({ sizeData = sampleSizeData, open, close }) => {
  const [modalVisible, setModalVisible] = useState(open);
  const [unit, setUnit] = useState("Inches");
  const slideAnim = React.useRef(new Animated.Value(0)).current;
  const sizeList = sizeData?.map((item) => item.size) || [];

  useEffect(() => {
    setModalVisible(open);
    Animated.timing(slideAnim, {
      toValue: open ? 1 : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [open]);

  const closeModal = () => {
    close();
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [height / 2, 0],
  });

  const groupMeasurementsByType = (measurements) => {
    const grouped = {};
    measurements.forEach((measurement) => {
      const typeName = measurement.measurementType.measurement_name;
      if (!grouped[typeName]) {
        grouped[typeName] = [];
      }
      grouped[typeName].push(measurement);
    });
    return grouped;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[styles.modalContent, { transform: [{ translateY }] }]}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              Product Measurement Size Chart
            </Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sizeOption}>
            <Text style={styles.sizeLabelTitle}>Size</Text>
            <View style={styles.sizeButtonContainer}>
              {sizeList?.map((size, index) => (
                <TouchableOpacity key={index} style={styles.sizeButton}>
                  <Text style={styles.sizeButtonText}>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.unitOption}>
            <TouchableOpacity
              style={[
                styles.unitButton,
                unit === "Cms" && styles.unitButtonActive,
              ]}
              onPress={() => setUnit("Cms")}
            >
              <Text
                style={[
                  styles.unitButtonText,
                  unit === "Cms" && styles.unitButtonTextActive,
                ]}
              >
                Cms
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.unitButton,
                unit === "Inches" && styles.unitButtonActive,
              ]}
              onPress={() => setUnit("Inches")}
            >
              <Text
                style={[
                  styles.unitButtonText,
                  unit === "Inches" && styles.unitButtonTextActive,
                ]}
              >
                Inches
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Size</Text>
                <Text style={styles.tableHeaderText}>Bust</Text>
                <Text style={styles.tableHeaderText}>Waist</Text>
                <Text style={styles.tableHeaderText}>Hip</Text>
                <Text style={styles.tableHeaderText}>Length</Text>
              </View>
              {sizeData?.map((sizeItem, index) => {
                const groupedMeasurements = groupMeasurementsByType(
                  sizeItem.ProductSizeMeasurement
                );
                return (
                  <View style={styles.tableRow} key={index}>
                    <Text style={styles.tableCell}>{sizeItem.size}</Text>
                    <Text style={styles.tableCell}>
                      {groupedMeasurements?.chest?.[0]?.value}
                    </Text>
                    <Text style={styles.tableCell}>
                      {groupedMeasurements?.waist?.[0]?.value}
                    </Text>
                    <Text style={styles.tableCell}>
                      {groupedMeasurements?.hip?.[0]?.value ?? "-"}
                    </Text>
                    <Text style={styles.tableCell}>
                      {groupedMeasurements?.length?.[0]?.value ?? "-"}
                    </Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#f0e6f9",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 15,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "rgba(196, 115, 255, 1)",
    width: "100%",
    borderRadius: "10%",
  },
  modalTitle: {
    color: "#fff",
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    right: 130,
    top: -70,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: "#c8a0e1",
    borderRadius: "100%",
    padding: 15,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  sizeOption: {
    marginBottom: 10,
  },
  sizeLabelTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sizeButtonContainer: {
    flexDirection: "row",
    gap: 5,
  },
  sizeButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#FFF",
    borderColor: "#ddd",
  },
  sizeButtonText: {
    fontSize: 16,
  },
  unitOption: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 10,
  },
  unitButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#FFF",
    borderColor: "#ddd",
  },
  unitButtonActive: {
    backgroundColor: "#c8a0e1",
    borderColor: "#c8a0e1",
  },
  unitButtonText: {
    fontSize: 16,
    color: "#000",
  },
  unitButtonTextActive: {
    color: "#fff",
  },
  table: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#c8a0e1",
    paddingVertical: 10,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 10,
  },
});

export default SizeChartModal;
