// RelatedProducts.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { GColors } from "@/src/constants/GStyles";
import ProductCard1 from "../ui/Product/ProductCard1";

type ProductCardProps = {
  img: string;
  productId: string | number;
  price: number;
  product_name: string;
  discount?: number;
};

const sampleRelatedProducts: ProductCardProps[] = [
  {
    productId: 1,
    img:
      "https://i.pinimg.com/564x/f6/a0/1c/f6a01c1a48bbdf78121c26221528dd8e.jpg",
    product_name: "Colored crop top",
    price: 2300.00,
    discount: 10,
  },
  {
    productId: 2,
    img:
      "https://i.pinimg.com/564x/0f/d4/a4/0fd4a4c0cfcf95e7f4f0f4f4f4f4f4f.jpg",
    product_name: "Striped long sleeve",
    price: 3000.00,
    discount: 20,
  },
  {
    productId: 3,
    img:
      "https://i.pinimg.com/564x/ac/fe/8d/acfe8d6c6c9f2c7a5a5a5a5a5a5a5a.jpg",
    product_name: "Floral maxi dress",
    price: 4000.00,
    discount: 25,
  },
  {
    productId: 4,
    img:
      "https://i.pinimg.com/564x/0f/4f/8f/0f4f8f8f8f8f8f8f8f8f8f8f8f8f8.jpg",
    product_name: "Denim shorts",
    price: 2000.00,
    discount: 15,
  },
  {
    productId: 5,
    img:
      "https://i.pinimg.com/564x/3f/5a/6d/3f5a6d6d6d6d6d6d6d6d6d6d6d.jpg",
    product_name: "Off the shoulder top",
    price: 2800.00,
    discount: 12,
  },
  {
    productId: 6,
    img:
      "https://i.pinimg.com/564x/1a/b7/5a/1ab75a5a5a5a5a5a5a5a5a5a5a5a.jpg",
    product_name: "Embroidered jeans",
    price: 3500.00,
    discount: 22,
  },
];


const RelatedProducts: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Related Products</Text>
      <FlatList
        data={sampleRelatedProducts}
        renderItem={({ item }) => <ProductCard1 {...item} />}
        keyExtractor={(item) => item.productId.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    flex: 1,
    alignItems: "center",
    padding: 8,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 100,
    overflow: "hidden",
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  heartIconContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    borderRadius: 100,
    padding: 4,
  },
  discountTag: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: GColors.primary,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
  },
  discountText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  title: {
    fontSize: 14,
    textAlign: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default RelatedProducts;
