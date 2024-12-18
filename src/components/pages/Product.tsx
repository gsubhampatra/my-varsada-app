import ProductDesc from "../ui/ProductDescription/ProductDesc";
import SimilarProduct from "../ui/ProductDescription/SimilarProduct";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import Navbar from "../Nav";

export default function Product() {
  const { productId } = useLocalSearchParams();
  const [productIdState, setProductIdState] = useState<string | null>(null);

  return (
    <SafeAreaView>
      {productIdState ? (
        <View>
          <Navbar navText="Product" navColor="white" openDrawer={() => {}} />
          <View style={{ flex: 1, minHeight: "100%" }}>
            <ProductDesc productId={productIdState} />
          </View>
          <SimilarProduct productId={productIdState} />
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 18, color: "gray" }}>No product found</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
