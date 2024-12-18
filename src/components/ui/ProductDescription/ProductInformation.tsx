// ProductInformation.tsx

import React from 'react';
import ProductHeading from './ProductHeading';
import ProductPrice from './ProductPrice';
import {
  ProductColor as ProductColorArr,
  ProductData,
  Size,
} from '../../../types/ResponceTypes';
import { UseQueryResult } from '@tanstack/react-query';
import { payload } from '../../../store/globalVars';
import ProductColor from './ProductColor';
import ProductBuyButtons from './ProductBuyButtons';
import ProductLongDesc from './ProductLongDesc';
import ProductSize from './ProductSize';
import { Text, View } from 'react-native';
import { sampleProductQueryData, sampleSizeQueryData, sampleColorQueryData } from '../../../sampleData'; // Import the sample data

export default function ProductInformation({
  product= sampleProductQueryData, // Default value here
  size= sampleSizeQueryData,       // Default value here
  color= sampleColorQueryData,     // Default value here
  productId= '1',           // Default value here
}: {
    product?: UseQueryResult<ProductData>;
    size?: UseQueryResult<{
        sizedata: Size[];
        sizeArr: string[];
    }>;
    color?: UseQueryResult<{
        colorData: ProductColorArr[];
        colorArr: {
            name: string;
            id: string;
            hex: string;
        }[];
    }>;
    productId?: string;
}) {

  if(!product?.data || !size?.data || !color?.data) return <Text>Loading..</Text>;

  return (
    <View>
      <ProductHeading text={product?.data?.product[0]?.short_description} />
      <ProductPrice
        price={product?.data?.product[0]?.price}
        productId={parseInt(productId)}
      />
      <ProductLongDesc desc={product?.data?.product[0]?.long_description} />
      <ProductSize size={size} />
        <ProductColor colorData={color?.data?.colorData} payload={payload} />
       <ProductBuyButtons productId={productId} payload={payload} />
    </View>
  );
}