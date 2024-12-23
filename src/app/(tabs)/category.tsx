// CategoryScreen.tsx
import { View, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { GColors, Gstyles } from "../../constants/GStyles";
import ProductCard1 from "@/src/components/ui/Product/ProductCard1";
import CategoryList from "@/src/components/category/CategoryList";
import { API_ROUTES } from "@/src/kv";
import api from "@/src/http/axiosconfig";
import { CategoryTypeData } from "@/src/types/ResponceTypes";
import { useSearchParams } from "expo-router/build/hooks";
import { useCategoryFilter } from "@/src/context/CategoryFiltersContext";
import { useQuery } from "@tanstack/react-query";

async function getCategories(): Promise<CategoryTypeData> {
  const res = await api.get(API_ROUTES.CATEGORY_TYPE.GET_ALL);
  return res.data;
}

interface Product {
  id: number;
  name: string;
  price: string;
  img: string;
  discount?: number;
}

const data = {
  categoryType: [
    {
      id: 1,
      type_name: "Bikini",
      thumbnail:
        "https://varsada.com/wp-content/uploads/2024/11/AKS9583-scaled.jpg",
      categories: [
        {
          id: 1,
          category_name: "Bikini",
        },
      ],
    },
    {
      id: 2,
      type_name: "Denim",
      thumbnail:
        "https://varsada.com/wp-content/uploads/2024/11/AKS9684-scaled.jpg",
      categories: [
        {
          id: 2,
          category_name: "Denim",
        },
      ],
    },
    {
      id: 3,
      type_name: "Party",
      thumbnail:
        "https://varsada.com/wp-content/uploads/2024/11/AKS9748-scaled.jpg",
      categories: [
        {
          id: 3,
          category_name: "Party",
        },
      ],
    },
    {
      id: 4,
      type_name: "Active Wear",
      thumbnail:
        "https://varsada.com/wp-content/uploads/2024/11/AKS9781-scaled.jpg",
      categories: [
        {
          id: 4,
          category_name: "Active Wear",
        },
      ],
    },
  ],
};

const CategoryScreen = () => {
  // const [searchParams] = useSearchParams();
  // const categoryTypeId = searchParams.get('categoryTypeId');
  // const { setCategoryFilters } = useCategoryFilter();
  const categoryTypeId = 1;
  // const { data } = useQuery<CategoryTypeData>({
  //   queryKey: ['category'],
  //   queryFn: getCategories,
  //   onSuccess(data) {
  //     console.log(data);
  //   },
  // });

  const productsdata: Product[] = [
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
      <View style={styles.container}>
        <CategoryList
          seletctedCategorytypeId={categoryTypeId}
          categoryType={data.categoryType}
        />
        <View style={styles.productContainer}>
          <ScrollView>
            <View style={styles.grid}>
              {productsdata.map((product) => (
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
