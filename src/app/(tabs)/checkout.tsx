import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Make sure you have this installed
import { MaterialIcons } from "@expo/vector-icons";
import { GColors } from "@/src/constants/GStyles";

interface Product {
  id: number;
  imageUrl: string;
  description: string;
  size: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  availableColors: string[];
}

const products: Product[] = [
  {
    id: 1,
    imageUrl:
      "https://i.pinimg.com/736x/b9/05/12/b905126f27c244073a99f9416bf8d5d6.jpg",
    description: "Colored crop top",
    size: "XL",
    originalPrice: 5120.58,
    discountedPrice: 2300.0,
    discountPercent: 45,
    availableColors: ["#FF7F50", "#9400D3"],
  },
  {
    id: 2,
    imageUrl:
      "https://i.pinimg.com/736x/b9/05/12/b905126f27c244073a99f9416bf8d5d6.jpg",
    description: "Colored crop top",
    size: "XL",
    originalPrice: 5120.58,
    discountedPrice: 2300.0,
    discountPercent: 45,
    availableColors: ["#FF7F50", "#9400D3"],
  },
  {
    id: 3,
    imageUrl:
      "https://i.pinimg.com/736x/b9/05/12/b905126f27c244073a99f9416bf8d5d6.jpg",
    description: "Colored crop top",
    size: "XL",
    originalPrice: 5120.58,
    discountedPrice: 2300.0,
    discountPercent: 45,
    availableColors: ["#FF7F50", "#9400D3"],
  },
  {
    id: 4,
    imageUrl:
      "https://i.pinimg.com/736x/b9/05/12/b905126f27c244073a99f9416bf8d5d6.jpg",
    description: "Colored crop top",
    size: "XL",
    originalPrice: 5120.58,
    discountedPrice: 2300.0,
    discountPercent: 45,
    availableColors: ["#FF7F50", "#9400D3"],
  },
];

const OrderItem: React.FC<{
  product: Product;
  isSelected: boolean;
  onToggleSelect: () => void;
}> = ({ product, isSelected, onToggleSelect }) => {
  return (
    <View style={styles.orderItemContainer}>
      <TouchableOpacity
        onPress={onToggleSelect}
        style={styles.checkboxContainer}
      >
        <View
          style={[styles.checkbox, isSelected && styles.checkboxSelected]}
        ></View>
      </TouchableOpacity>

      <View style={styles.productInfoContainer}>
        <View style={{ overflow: "hidden", borderRadius: 8 }}>
          <Image
            style={styles.productImage}
            source={{ uri: product.imageUrl }}
          />
          <View style={styles.discountTag}>
            <Text style={styles.discountText}>
              {product.discountPercent}% OFF
            </Text>
          </View>
        </View>
        <View style={styles.details}>
          <Text style={styles.productTitle}>{product.description}</Text>
          <Text style={styles.sizeText}>Size: {product.size}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.originalPrice}>
              ₹{product.originalPrice.toFixed(2)}
            </Text>
            <Text style={styles.discountedPrice}>
              ₹{product.discountedPrice.toFixed(2)}
            </Text>
          </View>
          <View style={styles.colorContainer}>
            {product.availableColors.map((color) => (
              <View
                key={color}
                style={[styles.colorOption, { backgroundColor: color }]}
              />
            ))}
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.heartIconContainer}>
        <AntDesign name="hearto" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get("window");

const OrderList: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const totalAmount = selectedProducts.reduce((sum, productId) => {
    const product = products.find((p) => p.id === productId);
    return product ? sum + product.discountedPrice : sum;
  }, 0);

  const handleToggleSelect = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };
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
          <TouchableOpacity style={styles.changeButton}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.deliveryContainer}>
          <Text style={styles.deliveryTitle}>Estimated Delivery Date</Text>
          <Text style={styles.deliveryDate}>Tommorrow</Text>
        </View>

        <Text style={styles.orderListTitle}>Order List</Text>
        {products.map((product) => (
          <OrderItem
            key={product.id}
            product={product}
            isSelected={selectedProducts.includes(product.id)}
            onToggleSelect={() => handleToggleSelect(product.id)}
          />
        ))}
        <View style={styles.bottomContainer}>
            <Text style={styles.originalPrice}>{totalAmount.toFixed(2)}</Text>
            <Text style={styles.totalPrice}>{totalAmount.toFixed(2)}</Text>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>
              Check Out <Text>(2)</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  orderItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
  },
  checkboxContainer: {
    padding: 5,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 3,
    marginRight: 10,
  },
  checkboxSelected: {
    backgroundColor: "black",
  },
  productInfoContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-start",
  },
  productImage: {
    width: 80,
    height: 100,
    resizeMode: "cover",
    marginRight: 10,
    borderRadius: 8,
  },
  discountTag: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "purple",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
  },
  discountText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  details: {
    flex: 1,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  sizeText: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },
  priceContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  originalPrice: {
    textDecorationLine: "line-through",
    marginRight: 5,
    color: "grey",
    fontSize: 12,
  },
  discountedPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  colorContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  colorOption: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 5,
  },
  heartIconContainer: {
    backgroundColor: "transparent",
    padding: 6,
    marginLeft: 10,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
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
});

export default OrderList;
