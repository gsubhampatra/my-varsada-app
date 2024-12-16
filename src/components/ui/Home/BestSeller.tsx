import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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
  ],
};

// const fetchTrending = async (): Promise<Trendin> => {
//   const res = await api.get(API_ROUTES.TRENDING.GET_ALL);
//   return res.data;
// };

export default function BestSeller() {
  // const { data, isLoading, error } = useQuery<Trendin>({
  //     queryKey: ['trending'],
  //     queryFn: fetchTrending,
  // });

  // if (isLoading) return <ProductListLoading isShowFilters={false} />;
  // if (error) return <EmptyBox text="No Trending Products" />;
  // if(data) console.log(data.trending[0].ProductColor[0].medias[0].url)

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Our Best Sellers</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.viewMore}>view more</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.productList}>
            {data?.trending?.map((pro, index) => (
              <ProductCard2
                img={pro?.ProductColor[0]?.medias[0]?.url}
                key={index}
                name={pro?.product_name}
                price={pro?.price}
                id={pro?.id}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    paddingVertical: 20,
  },
  headerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
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
