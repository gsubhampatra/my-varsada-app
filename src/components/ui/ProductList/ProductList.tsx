import { useMutation } from '@tanstack/react-query';
import api from '../../../http/axiosconfig';
import { API_ROUTES } from '../../../kv';
import ProductCard1 from '../Product/ProductCard1';
import { useEffect, useState } from 'react';
import { ProductWithImageData } from '../../../types/ResponceTypes';
import { useProductFilter } from '../../../context/ProductFiltersContext';
import { Filter as FilterType } from '../../../types/productTypes';
import { Alert, Skeleton } from 'antd';

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
  const [products, setProducts] = useState<ProductWithImageData[]>();
  const { productFilters } = useProductFilter();
  const [isLoading, setIsLoading] = useState(true);

  const mutation = useMutation(fetchProductList, {
    onSuccess: (data) => {
      console.log(data);
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
      <div className="flex justify-center items-center">
        <Alert type="error" showIcon message="No Products Found" />
      </div>
    );

  if (products)
    return (
      <div
        className={`grid ${isShowFilters ? 'grid-cols-3' : 'grid-cols-4'} gap-4`}
      >
        {isLoading ? (
          <>
            <Skeleton.Node
              active={true}
              style={{ width: '100%', height: 300 }}
            />
            <Skeleton.Node
              active={true}
              style={{ width: '100%', height: 300 }}
            />
            <Skeleton.Node
              active={true}
              style={{ width: '100%', height: 300 }}
            />
            <Skeleton.Node
              active={true}
              style={{ width: '100%', height: 300 }}
            />
          </>
        ) : (
          products?.map((product) => (
            <ProductCard1
              key={product.id}
              img={product?.ProductColor[0]?.medias[0]?.url}
              productId={product.id}
              price={product.price}
              product_name={product.product_name}
            />
          ))
        )}
      </div>
    );
}
