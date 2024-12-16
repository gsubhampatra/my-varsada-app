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

export default function ProductInformation({
  product,
  size,
  color,
  productId,
}: {
  product: UseQueryResult<ProductData>;
  size: UseQueryResult<{
    sizedata: Size[];
    sizeArr: string[];
  }>;
  color: UseQueryResult<{
    colorData: ProductColorArr[];
    colorArr: {
      name: string;
      id: string;
      hex: string;
    }[];
  }>;
  productId: string;
}) {
  return (
    <div className="flex flex-col gap-2 px-4">
      <ProductHeading text={product?.data?.product[0]?.short_description} />
      <ProductPrice
        price={product?.data?.product[0]?.price}
        productId={parseInt(productId)}
      />
      <ProductLongDesc desc={product?.data?.product[0]?.long_description} />
      <ProductSize size={size} />

      {color.data?.colorData ? (
        <ProductColor colorData={color.data?.colorData} payload={payload} />
      ) : null}
      {productId ? (
        <ProductBuyButtons productId={productId} payload={payload} />
      ) : null}
    </div>
  );
}
