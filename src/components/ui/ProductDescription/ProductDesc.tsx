import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import ProductImages from "./ProductImages";
import { useQueries } from "@tanstack/react-query";
import { API_ROUTES } from "../../../kv";
import api from "../../../http/axiosconfig";
import {
  ProductColorData,
  ProductData,
  SizeData,
} from "../../../types/ResponceTypes";
import { payload } from "../../../store/globalVars";
import ProductInformation from "./ProductInformation";
import { useProductStore } from "../../../store/useStore";

const fetchProduct = async (productId: string | null): Promise<ProductData> => {
  const res = await fetch(`${API_ROUTES.PRODUCT.GET_BY_ID}${productId}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};

const fetchSize = async (productId: string | null): Promise<SizeData> => {
  const res = await fetch(`${API_ROUTES.MEASUREMENT.GET_BY_ID}${productId}`);
  if (!res.ok) throw new Error("Failed to fetch size");
  return res.json();
};

async function fetchColor(productId: string): Promise<ProductColorData> {
  const res = await api.get(API_ROUTES.COLOR.GET_BY_ID + productId);
  if (!res.status) throw new Error("Failed to fetch colors");
  return res.data;
}

type ProductDescProps = {
  productId: string;
};

export default function ProductDesc({ productId }: ProductDescProps) {
  // fixes a infinite render issue .. TODO use onSucess and make this a state for better mannagement
  payload.productId = productId;

  const { selectedColorId } = useProductStore();

  const results = useQueries({
    queries: [
      {
        queryKey: ["product", productId],
        queryFn: () => fetchProduct(productId),
      },
      {
        queryKey: ["size", productId],
        queryFn: () => fetchSize(productId),
        select: (data: SizeData) => ({
          sizedata: data.size,
          sizeArr: data.size.map((s) => s.size),
        }),
      },
      {
        queryKey: ["product_color", productId],
        queryFn: () => fetchColor(productId),
        select: (data: ProductColorData) => ({
          colorData: data.productColor,
          colorArr: data.productColor.map((s) => ({
            name: s.color_name,
            id: s.id,
            hex: s.hex_value,
          })),
        }),
      },
    ],
  });

  const [product, size, color] = results;

  // if (product.isError) return <Text>Error loading categories.</Text>;
  if (product.data) {
    payload.productId = productId;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
            <ProductImages />
        </View>
        <ProductInformation
          product={product}
          size={size}
          color={color}
          productId={productId}
        />
      </View>
    </ScrollView>
  );
}

const SkeletonComponent = () => {
  return (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeleton} />
      <View style={styles.skeleton} />
      <View style={styles.skeleton} />
      <View style={styles.skeleton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8EDEB",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    gap: 20,
  },
  imageContainer: {
    flex: 2,
  },
  skeletonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  skeleton: {
    width: 350,
    height: 350,
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    minHeight: 400,
    justifyContent: "center",
    alignItems: "center",
  },
});
