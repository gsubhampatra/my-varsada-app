import React from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import ProductCard1 from "../Product/ProductCard1";
import api from "../../../http/axiosconfig";
import { API_ROUTES } from "../../../kv";
import ProductListLoading from "../Layout/Loading/ProductListLoading";
import ErrorBox from "../Layout/Error/ErrorBox";
import EmptyBox from "../Layout/Empty/EmptyBox";

interface DreamListData {
  status: boolean;
  dreamlist: [
    {
      productId: number;
      product: {
        product_name: string;
        price: number;
        ProductColor: [
          {
            medias: [
              {
                url: string;
              }
            ];
          }
        ];
      };
    }
  ];
}

const sampleData: DreamListData = {
  status: true,
  dreamlist: [
    {
      productId: 1,
      product: {
        product_name: "Sample product 1",
        price: 100,
        ProductColor: [
          {
            medias: [
              {
                url: "https://picsum.photos/200",
              },
            ],
          },
        ],
      },
    },
    {
      productId: 2,
      product: {
        product_name: "Sample product 2",
        price: 200,
        ProductColor: [
          {
            medias: [
              {
                url: "https://picsum.photos/201",
              },
            ],
          },
        ],
      },
    },
    {
      productId: 3,
      product: {
        product_name: "Sample product 3",
        price: 300,
        ProductColor: [
          {
            medias: [
              {
                url: "https://picsum.photos/202",
              },
            ],
          },
        ],
      },
    },
  ],
};

export default function DreamListProducts() {
  const { data, isLoading } = useQuery<DreamListData>({
    queryKey: ["dreamlist"],
    queryFn: () => Promise.resolve(sampleData),
  });

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (data?.dreamlist.length > 0) {
    return (
      <FlatList
        data={data.dreamlist}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ProductCard1
            img={item.product.ProductColor[0].medias[0].url}
            productId={item.productId.toString()}
            product_name={item.product.product_name}
            price={item.product.price}
          />
        )}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
    );
  } else {
    return <Text>No products in dreamlist</Text>;
  }
}
