import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../../http/axiosconfig';
import { API_ROUTES } from '../../../kv';
import { ProductWithImageData } from '../../../types/ResponceTypes';
import { useCategoryTypeStore } from '../../../store/useStore';
import FilterPrice from '../ProductList/Filter/FilterPrice';
import FilterColor from '../ProductList/Filter/FilterColor';
import FilterSize from '../ProductList/Filter/FilterSize';
import { useCategoryFilter } from '../../../context/CategoryFiltersContext';
import { useFocusEffect } from 'expo-router';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

interface categoryTypeProductData {
  status: string;
  categoryType: {
    id: number;
    type_name: string;
    categories: {
      id: number;
      category_name: string;
      products: {
        id: number;
        product_name: string;
        price: number;
        ProductColor: {
          medias: {
            url: string;
          }[];
        }[];
      }[];
    }[];
  }[];
}

async function getCategoryProducts(
  categoryTypeId: string | null,
  color?: string,
  size?: string,
  min_price?: number,
  max_price?: number,
  sort?: 'new' | 'lth' | 'htl'
): Promise<categoryTypeProductData> {
  if (!categoryTypeId) {
    return {
      status: 'false',
      categoryType: [{ id: 0, type_name: '', categories: [] }],
    };
  }
  const res = await api.get(
    API_ROUTES.CATEGORY_TYPE.GET_PRODUCT_BY_TYPE_ID +
      categoryTypeId +
      `&color=${color}&size=${size}&min_price=${min_price}&max_price=${max_price}&sort=${sort}`
  );
  return res.data;
}

export default function SideNav({
  seletctedCategorytypeId,
  categoryType,
}: {
  seletctedCategorytypeId: string | null;
  categoryType: {
    id: number;
    type_name: string;
    categories: {
      id: number;
      category_name: string;
    }[];
  }[];
}) {
  const [selectedCategoryTypeId, setSelectedCategoryTypeId] = useState<
    string | null
  >(seletctedCategorytypeId);

  const { setProductForCategoryType, setIsLoading } = useCategoryTypeStore();
  const { setCategoryFilters, categoryFilters } = useCategoryFilter();


  const { isLoading, data,error } = useQuery<categoryTypeProductData>({
    queryKey: ['categoryProducts', selectedCategoryTypeId, categoryFilters],
    queryFn: () =>
      getCategoryProducts(
        selectedCategoryTypeId,
        categoryFilters?.color,
        categoryFilters?.size,
        categoryFilters?.min_price,
        categoryFilters?.max_price,
        categoryFilters?.sort
      ),
    }
  )
  if (data) {
    console.log(data.categoryType);
    const productArr: ProductWithImageData[] = data.categoryType
      .flatMap((categoryType) => categoryType.categories)
      .flatMap((category) => category.products)
      .map((product) => ({
        id: product.id,
        product_name: product.product_name,
        price: product.price,
        ProductColor: product.ProductColor.map((color) => ({
          medias: color.medias.map((media) => ({
            url: media.url,
          })),
        })),
      }));
    console.log(productArr);
    setProductForCategoryType(productArr);
    setIsLoading(false);
  
  }
  useFocusEffect(
    React.useCallback(() => {
      if (isLoading) {
        setProductForCategoryType([]);
        setIsLoading(true);
      }
    }, [isLoading])
  );


  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Category {isLoading ? '...' : null}
      </Text>
      <FlatList
        data={categoryType}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedCategoryTypeId(item.id.toString())}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 16,
              backgroundColor:
                selectedCategoryTypeId === item.id.toString()
                  ? '#e6e6e6'
                  : '#fff',
              borderRadius: 8,
              marginBottom: 16,
            }}
          >
            <Text style={{ fontSize: 16 }}>{item.type_name}</Text>
            {/* <Text style={{ fontSize: 16, transform: [{ rotate: '90deg' }] }}>
              >
            </Text> */}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      {/* {selectedCategoryTypeId && (
        <View style={{ paddingLeft: 16 }}>
          <CategoryList categories={categoryType.find((category) => category.id === parseInt(selectedCategoryTypeId)).categories} />
        </View>
      )} */}
      {/* <View style={{ padding: 16, borderRadius: 8 }}> */}

      <FilterPrice setFilters={setCategoryFilters} />
      <FilterColor
        setFilters={setCategoryFilters}
        ColorFilter={categoryFilters?.color}
      />
      <FilterSize
        setFilters={setCategoryFilters}
        Sizefilter={categoryFilters?.size}
      />
      {/* </View> */}
    </View>
  );
}


