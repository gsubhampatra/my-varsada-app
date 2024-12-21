// ProductScreen.tsx
import ProductDescription from "@/src/components/products/ProductDescription";
import ProductDetails from "@/src/components/products/ProductDetails";
import RelatedProducts from "@/src/components/products/RelatedProducts";
import ProductImages from "@/src/components/ui/ProductDescription/ProductImages";
import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
const ProductScreen = () => {
  const handleSizeSelect = (size: string) => {
    //   alert('Selected size:' + size)
  };
  const handleColorSelect = (colorId: string) => {
    //   alert('Selected color ID:' + colorId)
  };
  const sampleDetails = [
    { label: "Material", value: "Polyester" },
    { label: "Stretchability", value: "Not Stretchable" },
    { label: "Fit", value: "Regular Fit" },
    { label: "Quantity", value: "1 Piece" },
    { label: "Chest Pad", value: "No" },
    { label: "Belt", value: "No" },
    { label: "Neckline", value: "NA" },
    { label: "Sleeve Type", value: "Sleeveless" },
    { label: "Sleeve Length", value: "Sleeveless" },
    { label: "Length", value: "Short" },
    { label: "Silhouette", value: "A-line" },
  ];

  const sampleSpecification = [
    { label: "Material", value: "Polyester" },
    { label: "Stretchability", value: "Not Stretchable" },
    { label: "Fit", value: "Regular Fit" },
    { label: "Quantity", value: "1 Piece" },
    { label: "Chest Pad", value: "No" },
    { label: "Belt", value: "No" },
    { label: "Neckline", value: "NA" },
    { label: "Sleeve Type", value: "Sleeveless" },
    { label: "Sleeve Length", value: "Sleeveless" },
    { label: "Length", value: "Short" },
    { label: "Silhouette", value: "A-line" },
  ];

  const sampleServicePolicy = [
    { label: "Return Policy", value: "7 Days Return Policy" },
    { label: "Cash on Delivery", value: "Available" },
    { label: "Warranty", value: "No" },
    { label: "Shipping", value: "Free" },
    { label: "Delivery", value: "3-5 days" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <ProductImages />
        <ProductDetails
          onSizeSelect={handleSizeSelect}
          onColorSelect={handleColorSelect}
        />
        <ProductDescription
          specification={sampleSpecification}
          servicePolicy={sampleServicePolicy}
          details={sampleDetails}
        />
        <RelatedProducts />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    width: "100%",
  },
});

export default ProductScreen;
