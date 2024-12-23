import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { GColors } from "@/src/constants/GStyles";

interface Product {
  id: number;
  imageUrl: string;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
}

interface ProductCardProps {
  product: Product;
  onHeartPress?: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({ product, onHeartPress }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
      <Text style={styles.discountText}>{product.discountPercent}% OFF</Text>
      <TouchableOpacity
        onPress={() => onHeartPress?.(product.id)}
        style={styles.heartIcon}
      >
        <AntDesign name="hearto" size={20} color="black" />
      </TouchableOpacity>
      <Text style={styles.productTitle}>{product.title}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.originalPrice}>
          ₹{product.originalPrice.toFixed(2)}
        </Text>
        <Text style={styles.discountedPrice}>
          ₹{product.discountedPrice.toFixed(2)}
        </Text>
      </View>
    </View>
  )
);

interface ScrollableProductListProps {
  products: Product[];
  onHeartPress?: (productId: number) => void;
}

const ProductList: React.FC<ScrollableProductListProps> = ({
  products,
  onHeartPress,
}) => {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [visibleProductIndexes, setVisibleProductIndexes] = useState<number[]>(
    []
  );

  return (
    <ScrollView ref={scrollViewRef} scrollEventThrottle={400}>
      <View style={styles.gridContainer}>
        {products.map((product, index) =>
          visibleProductIndexes.includes(index) ? (
            <ProductCard
              key={product.id}
              product={product}
              onHeartPress={onHeartPress}
            />
          ) : (
            <View key={product.id} style={styles.productCard} />
          )
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "48%",
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: GColors.white,
  },
  productImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  discountText: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#C473FF",
    color: "white",
    padding: 4,
    borderRadius: 2,
    fontSize: 10,
    fontWeight: "bold",
  },
  heartIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 20,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "500",
    padding: 10,
  },
  priceContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  originalPrice: {
    textDecorationLine: "line-through",
    color: "gray",
    fontSize: 12,
  },
  discountedPrice: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ProductList;
