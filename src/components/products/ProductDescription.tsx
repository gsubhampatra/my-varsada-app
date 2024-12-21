// ProductDescription.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface ProductDescriptionProps {
  details: {
    label: string;
    value: string;
  }[];
  specification: {
    label: string;
    value: string;
  }[];
  servicePolicy: {
    label: string;
    value: string;
  }[];
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  details,
  specification,
  servicePolicy,
}) => {
  const [expandedDetails, setExpandedDetails] = useState(false);
  const [expandedSpecification, setExpandedSpecification] = useState(false);
  const [expandedServicePolicy, setExpandedServicePolicy] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setExpandedDetails(!expandedDetails)}
        style={styles.headerContainer}
      >
        <Text style={styles.header}>Product Details</Text>
        <AntDesign
          name={expandedDetails ? "caretup" : "caretdown"}
          size={16}
          color="black"
        />
      </TouchableOpacity>

      {expandedDetails && (
        <View style={styles.detailContainer}>
          {details.map((detail, index) => (
            <View key={index} style={styles.detailItem}>
              <Text style={styles.label}>{detail.label}:</Text>
              <Text style={styles.value}>{detail.value}</Text>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity
        onPress={() => setExpandedSpecification(!expandedSpecification)}
        style={styles.headerContainer}
      >
        <Text style={styles.header}>Specification</Text>
        <AntDesign
          name={expandedSpecification ? "caretup" : "caretdown"}
          size={16}
          color="black"
        />
      </TouchableOpacity>

      {expandedSpecification && (
        <View style={styles.detailContainer}>
          {specification.map((spec, index) => (
            <View key={index} style={styles.detailItem}>
              <Text style={styles.label}>{spec.label}:</Text>
              <Text style={styles.value}>{spec.value}</Text>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity
        onPress={() => setExpandedServicePolicy(!expandedServicePolicy)}
        style={styles.headerContainer}
      >
        <Text style={styles.header}>Service and Policy</Text>
        <AntDesign
          name={expandedServicePolicy ? "caretup" : "caretdown"}
          size={16}
          color="black"
        />
      </TouchableOpacity>

      {expandedServicePolicy && (
        <View style={styles.detailContainer}>
          {servicePolicy.map((policy, index) => (
            <View key={index} style={styles.detailItem}>
              <Text style={styles.label}>{policy.label}:</Text>
              <Text style={styles.value}>{policy.value}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detailContainer: {
    marginTop: 10,
  },
  detailItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 5,
  },
  value: {
    fontSize: 14,
  },
});

export default ProductDescription;
