import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Heart } from "../../../assets/icons";
import api from "../../../http/axiosconfig";
import { API_ROUTES } from "../../../kv";
import { useMutation } from "@tanstack/react-query";
import useAsyncStorageList from "../../../hooks/localStoragehooks";

export async function addToDreamList(productId: number) {
  const res = await api.post(API_ROUTES.USER.ADD_TO_DREAM_LIST, { productId });
  return res.data;
}

export async function removeFromDreamList(productId: number) {
  const res = await api.post(API_ROUTES.USER.REMOVE_FROM_DREAM_LIST, {
    productId,
  });
  return res.data;
}

type ProductCardProps = {
  img: string;
  productId: string | number;
  price: number;
  product_name: string;
  discount?: number;
};

export default function ProductCard1({
  img,
  productId,
  price,
  product_name,
  discount,
}: ProductCardProps) {
  const { list, addProduct, removeProduct } = useAsyncStorageList("dreamList");

  const addMutation = useMutation(addToDreamList, {
    onSuccess: () => {
      addProduct(productId.toString());
    },
  });

  const removeMutation = useMutation(removeFromDreamList, {
    onSuccess: () => {
      removeProduct(productId.toString());
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.badgeContainer}>
        {discount ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>45% off</Text>
          </View>
        ) : null}
        {list.includes(productId.toString()) ? (
          <TouchableOpacity
            style={styles.heartButton}
            onPress={() =>
              removeMutation.mutate(parseInt(productId.toString()))
            }
          >
            <Heart fill={true} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.heartButton}
            onPress={() => addMutation.mutate(parseInt(productId.toString()))}
          >
            <Heart fill={false} />
          </TouchableOpacity>
        )}
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
          <Text style={styles.price}>Rs {price}</Text>
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    cursor: "pointer",
    width: "100%",
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
    height: 150,
    overflow: "hidden",
    aspectRatio: 1 / 1.5,
  },
  image: {
    width: "100%",
    height: "100%",
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
});
