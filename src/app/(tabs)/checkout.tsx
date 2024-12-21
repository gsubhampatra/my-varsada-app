import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import ProductCheckOutCard from "@/src/components/ui/Product/ProductCheckOutCard";
import { GColors } from "@/src/constants/GStyles";

interface Product {
  id: number;
  imageUrl: string;
  productColorId: string;
  description: string;
  size: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  availableColors: string[];
  sizes: string[];
}

const products: Product[] = [
  {
    id: 1,
    productColorId: "1",
    imageUrl:
      "https://i.pinimg.com/736x/b9/05/12/b905126f27c244073a99f9416bf8d5d6.jpg",
    description: "Colored crop top",
    size: "XL",
    originalPrice: 5120.58,
    discountedPrice: 2300.0,
    discountPercent: 45,
    availableColors: ["#FF7F50", "#9400D3"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    productColorId: "2",
    imageUrl:
      "https://i.pinimg.com/736x/b9/05/12/b905126f27c244073a99f9416bf8d5d6.jpg",
    description: "Colored crop top",
    size: "XL",
    originalPrice: 5120.58,
    discountedPrice: 2300.0,
    discountPercent: 45,
    availableColors: ["#FF7F50", "#9400D3"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    productColorId: "3",
    imageUrl:
      "https://i.pinimg.com/736x/b9/05/12/b905126f27c244073a99f9416bf8d5d6.jpg",
    description: "Colored crop top",
    size: "XL",
    originalPrice: 5120.58,
    discountedPrice: 2300.0,
    discountPercent: 45,
    availableColors: ["#FF7F50", "#9400D3"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 4,
    productColorId: "4",
    imageUrl:
      "https://i.pinimg.com/736x/b9/05/12/b905126f27c244073a99f9416bf8d5d6.jpg",
    description: "Colored crop top",
    size: "XL",
    originalPrice: 5120.58,
    discountedPrice: 2300.0,
    discountPercent: 45,
    availableColors: ["#FF7F50", "#9400D3"],
    sizes: ["S", "M", "L", "XL"],
  },
];

const { width } = Dimensions.get("window");

const OrderList: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const totalAmount = selectedProducts.reduce((sum, productId) => {
    const product = products.find((p) => p.id === productId);
    return product ? sum + product.discountedPrice : sum;
  }, 0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.addressContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="location-on" size={16} color="black" />
              <Text style={styles.addressTitle}> Home</Text>
            </View>
            <Text style={styles.addressText}>
              1901 Thornridge Cir, Shiloh, Hawaii 81063
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/saved-address")}
            style={styles.changeButton}
          >
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.deliveryContainer}>
          <Text style={styles.deliveryTitle}>Estimated Delivery Date</Text>
          <Text style={styles.deliveryDate}>Tommorrow</Text>
        </View>

        <Text style={styles.orderListTitle}>Order List</Text>
        {products.map((product) => (
          <ProductCheckOutCard
            key={product.id}
            img={product.imageUrl}
            title={product.description}
            selectedSize={product.size}
            color={product.availableColors[0]}
            price={product.discountedPrice}
            productId={product.id}
            colorId={product.productColorId}
            sizes={product.sizes}
          />
        ))}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Text style={styles.originalPrice}>{totalAmount.toFixed(2)}</Text>
        <Text style={styles.totalPrice}>{totalAmount.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => router.push("/paymentPage")}
        >
          <Text style={styles.checkoutText}>
            Check Out <Text>({1})</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  addressContainer: {},
  addressTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  addressText: {
    fontSize: 12,
  },
  changeButton: {
    backgroundColor: "transparent",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  changeText: {
    fontSize: 12,
    color: "black",
  },
  deliveryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  deliveryTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  deliveryDate: {
    fontSize: 14,
    fontWeight: "400",
  },
  orderListTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 5,
    zIndex: 20,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: GColors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  checkoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: "line-through",
  },
});

export default OrderList;
