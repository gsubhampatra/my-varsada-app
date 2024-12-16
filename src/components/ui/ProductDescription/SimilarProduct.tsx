import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

import { useMutation } from "@tanstack/react-query";
import api from "../../../http/axiosconfig";
import { API_ROUTES } from "../../../kv";
import { ProductWithImageData } from "../../../types/ResponceTypes";

interface SimilarProductData {
  similar: ProductWithImageData[];
}

// async function getSimilarProducts(
//   productId: string
// ): Promise<SimilarProductData> {
//   const response = await api.post(API_ROUTES.FILTER.SIMILAR, {
//     productId: parseInt(productId),
//   });
//   return response.data;
// }

export default function SimilarProduct({ productId }: { productId: string }) {
  const [SimilarProduct, setSimilarProduct] = useState<ProductWithImageData[]>(
    []
  );

  // const mutation = useMutation(getSimilarProducts, {
  //   onSuccess: (data) => {
  //     console.log(data);
  //     setSimilarProduct(data.similar);
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //   },
  // });

  // useEffect(() => {
  //   mutation.mutate(productId);
  // }, [productId]);

  if (SimilarProduct)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Similar Items</Text>
        <FlatList
          numColumns={3}
          data={SimilarProduct}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image
                source={{ uri: item.ProductColor[0].medias[0].url }}
                style={styles.image}
              />
              <Text style={styles.name}>{item.product_name}</Text>
              <Text style={styles.price}>Rs {item.price}</Text>
            </View>
          )}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  name: {
    fontSize: 16,
  },
  price: {
    fontSize: 14,
  },
});
