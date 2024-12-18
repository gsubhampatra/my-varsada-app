import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import api from '../../../http/axiosconfig';
import { API_ROUTES } from '../../../kv';
import ProductCard1 from '../Product/ProductCard1';
import { useEffect, useState } from 'react';
import { ProductWithImageData } from '../../../types/ResponceTypes';
import { useProductFilter } from '../../../context/ProductFiltersContext';
import { Filter as FilterType } from '../../../types/productTypes';

type Prop = {
  isShowFilters: boolean;
  searchString: string | null;
};

interface ProductData {
  status: string;
  products: ProductWithImageData[];
}

async function fetchProductList({
  searchString,
  productFilters,
}: {
  searchString: string | null;
  productFilters: FilterType | undefined;
}): Promise<ProductData> {
  const response = await api.post(API_ROUTES.FILTER.SEARCH, {
    search: searchString,
    categoryTypeIds: productFilters?.categoryTypeIds,
    color: productFilters?.color,
    size: productFilters?.size,
    min_price: productFilters?.min_price,
    max_price: productFilters?.max_price,
    sort: productFilters?.sort,
  });
  return response.data;
}

export default function ProductList({ isShowFilters, searchString }: Prop) {
  const [products, setProducts] = useState<ProductWithImageData[]>([
    {
      id: 1,
      price: 1000,
      product_name: 'Product 1',
      ProductColor: [{ medias: [{ url: 'https://picsum.photos/200' }] }],
    },
    {
      id: 2,
      price: 2000,
      product_name: 'Product 2',
      ProductColor: [{ medias: [{ url: 'https://picsum.photos/201' }] }],
    },
    {
      id: 3,
      price: 3000,
      product_name: 'Product 3',
      ProductColor: [{ medias: [{ url: 'https://picsum.photos/202' }] }],
    },
  ]);
  const { productFilters } = useProductFilter();
  const [isLoading, setIsLoading] = useState(true);

  const mutation = useMutation(fetchProductList, {
    onSuccess: (data) => {
      setProducts(data?.products);
      setIsLoading(false);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    setIsLoading(true);
    mutation.mutate({ searchString, productFilters });
  }, [productFilters, searchString]);

  if (!isLoading && products?.length == 0)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No Products Found</Text>
      </View>
    );

  if (products)
    return (
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard1
            key={item.id}
            img={item?.ProductColor[0]?.medias[0]?.url}
            productId={item.id}
            price={item.price}
            product_name={item.product_name}
          />
        )}
        ListEmptyComponent={
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        }
        contentContainerStyle={styles.contentContainerStyle}
      />
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});


