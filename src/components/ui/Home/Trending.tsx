import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import ProductCard2 from "../Product/ProductCard2";
import { API_ROUTES } from "../../../kv";
import ProductListLoading from "../Layout/Loading/ProductListLoading";
import EmptyBox from "../Layout/Empty/EmptyBox";
import api from "../../../http/axiosconfig";

type Trendin = {
  trending: Product[];
};

type Product = {
  id: number;
  product_name: string;
  price: string;
  ProductColor: ProductColor[];
};

type ProductColor = {
  medias: media[];
};

type media = {
  url: string;
};

// const fetchTrending = async (): Promise<Trendin> => {
//   const res = await api.get(API_ROUTES.TRENDING.GET_ALL);
//   return res.data;
// };

const width = "100%";

const data: Trendin = {
  trending: [
    {
      id: 1,
      product_name: "Product 1",
      price: "100",
      ProductColor: [
        {
          medias: [
            {
              url: "https://via.placeholder.com/150",
            },
          ],
        },
      ],
    },
    {
      id: 1,
      product_name: "Product 1",
      price: "100",
      ProductColor: [
        {
          medias: [
            {
              url: "https://via.placeholder.com/150",
            },
          ],
        },
      ],
    },
    {
      id: 1,
      product_name: "Product 1",
      price: "100",
      ProductColor: [
        {
          medias: [
            {
              url: "https://via.placeholder.com/150",
            },
          ],
        },
      ],
    },
    {
      id: 1,
      product_name: "Product 1",
      price: "100",
      ProductColor: [
        {
          medias: [
            {
              url: "https://via.placeholder.com/150",
            },
          ],
        },
      ],
    },
    {
      id: 1,
      product_name: "Product 1",
      price: "100",
      ProductColor: [
        {
          medias: [
            {
              url: "https://via.placeholder.com/150",
            },
          ],
        },
      ],
    },
    {
      id: 1,
      product_name: "Product 1",
      price: "100",
      ProductColor: [
        {
          medias: [
            {
              url: "https://via.placeholder.com/150",
            },
          ],
        },
      ],
    },
    
  ],
};

export default function Trending() {
  // const { data, isLoading, error } = useQuery<Trendin>({
  //   queryKey: ["trending"],
  //   queryFn: fetchTrending,
  // });

  // if (isLoading) return <ProductListLoading isShowFilters={false} />;

  // if (error) return <EmptyBox text="No Trending Products" />;

  // if (data) console.log(data.trending[0]);

  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Trending Today</Text>
        <Text style={styles.viewMore}>view more</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <View style={styles.productList}>
          {data?.trending?.map((pro, index) => (
            <ProductCard2
              key={index}
              img={pro?.ProductColor[0]?.medias[0]?.url}
              name={pro?.product_name}
              price={pro?.price}
              id={pro?.id}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  viewMore: {
    fontSize: 16,
  },
  scrollViewContainer: {
    overflow: "hidden",
    marginHorizontal: 10,
  },
  productList: {
    flexDirection: "row",
    gap: 10,
    height: 300,
  },
});
