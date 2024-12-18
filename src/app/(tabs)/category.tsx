// CategoryScreen.tsx
import {
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import { GColors, Gstyles } from "../../constants/GStyles";
import Navbar from "@/src/components/Nav";
import ProductCard1 from "@/src/components/ui/Product/ProductCard1";
import CategoryList from "@/src/components/category/CategoryList";

interface Product {
  id: number;
  name: string;
  price: string;
  img: string;
  discount?: number;
}

const CategoryScreen = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Product 1",
      price: "1000",
      img: "https://via.placeholder.com/150",
      discount: 45,
    },
    {
      id: 2,
      name: "Product 2",
      price: "1200",
      img: "https://via.placeholder.com/150",
      discount: 30,
    },
    {
      id: 3,
      name: "Product 3",
      price: "900",
      img: "https://via.placeholder.com/150",
      discount: 20,
    },
    {
      id: 4,
      name: "Product 4",
      price: "1100",
      img: "https://via.placeholder.com/150",
      discount: 45,
    },
    {
      id: 5,
      name: "Product 5",
      price: "1100",
      img: "https://via.placeholder.com/150",
      discount: 45,
    },
    {
      id: 6,
      name: "Product 6",
      price: "1300",
      img: "https://via.placeholder.com/150",
      discount: 30,
    },
  ];

  return (
    <View style={Gstyles.container}>
      <Navbar
        navText="Category"
        navColor={GColors.primary}
        openDrawer={() => {}}
      />
      <View style={styles.container}>
        <CategoryList />
        <View style={styles.productContainer}>
          <ScrollView>
            <View style={styles.grid}>
            {products.map((product) => (
              <ProductCard1
                key={product.id}
                productId={product.id}
                product_name={product.name}
                price={parseInt(product.price)}
                img={product.img}
                discount={product.discount}
              />
            ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  productContainer: {
    flex: 1,
    padding: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
