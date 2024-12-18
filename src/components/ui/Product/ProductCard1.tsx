// ProductCard1.tsx
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Heart } from "../../../assets/icons";

type ProductCardProps = {
  img: string;
  productId: string | number;
  price: number;
  product_name: string;
  discount?: number;
};

const ProductCard1: React.FC<ProductCardProps> = ({
  img,
  productId,
  price,
  product_name,
  discount,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.badgeContainer}>
        {discount ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discount}% off</Text>
          </View>
        ) : null}
        <TouchableOpacity style={styles.heartButton}>
          <Heart fill={false} />
        </TouchableOpacity>
      </View>
      <Link href={`/product?productId=${productId}`}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: img }}
            alt={product_name}
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productName}>{product_name}</Text>
          {discount && <Text style={styles.discount}>Rs {price}</Text>}
          <Text style={styles.price}>Rs {price}</Text>
        </View>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    cursor: "pointer",
      width: "48%",
      marginBottom: 10,
    height: 200,
  },
  badgeContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  discountBadge: {
    backgroundColor: "#C473FF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  discountText: {
    color: "white",
    fontSize: 12,
  },
  heartButton: {
    backgroundColor: "white",
    opacity: 0.6,
    borderRadius: 999,
    padding: 5,
  },
  imageContainer: {
    height: 200,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  textContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  price: {
    fontSize: 12,
    fontWeight: "bold",
  },
    discount: {
    fontSize: 12,
        textDecorationLine: 'line-through'
    }
});
export default ProductCard1;