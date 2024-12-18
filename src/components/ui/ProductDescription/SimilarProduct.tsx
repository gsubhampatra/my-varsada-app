// SimilarProduct.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

import { ProductWithImageData } from "../../../types/ResponceTypes";


interface SimilarProductData {
  similar: ProductWithImageData[];
}


const sampleSimilarProducts: SimilarProductData = {
    similar: [
        {
            id: 1,
            product_name: "Product 1",
            price: "1000",
            ProductColor: [
                {
                   medias: [ {
                        url: "https://i.pinimg.com/564x/a6/60/b9/a660b96060154e684a1b9c08aa4b33b2.jpg"
                    }]
                }
            ]
        },
        {
            id: 2,
            product_name: "Product 2",
            price: "1200",
            ProductColor: [
                {
                    medias: [ {
                        url: "https://i.pinimg.com/564x/f6/a0/1c/f6a01c1a48bbdf78121c26221528dd8e.jpg"
                    }]
                }
            ]
        },
        {
            id: 3,
            product_name: "Product 3",
            price: "900",
              ProductColor: [
                {
                    medias: [ {
                        url: "https://i.pinimg.com/564x/5a/c0/58/5ac0586e2a014e451d4c8949a628c8d0.jpg"
                    }]
                }
            ]
        },
         {
            id: 4,
            product_name: "Product 4",
            price: "1100",
              ProductColor: [
                {
                    medias: [ {
                        url: "https://i.pinimg.com/564x/d6/3f/d5/d63fd5c208a0d487b34ab648a154d717.jpg"
                    }]
                }
            ]
        },

    ]
}
export default function SimilarProduct({ productId }: { productId: string }) {
  const [SimilarProduct, setSimilarProduct] = useState<ProductWithImageData[]>(sampleSimilarProducts.similar);


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