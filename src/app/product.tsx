// ProductScreen.tsx
import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import ProductDetails from "../components/products/ProductDetails";
import ProductDescription from "../components/products/ProductDescription";
import RelatedProducts from "../components/products/RelatedProducts";
import ProductImages from "../components/ui/ProductDescription/ProductImages";
import ProductHeading from "../components/ui/ProductDescription/ProductHeading";

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <ProductImages />
        <ProductDetails
          onSizeSelect={handleSizeSelect}
          onColorSelect={handleColorSelect}
        />
        <ProductDescription details={sampleDetails} />
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
