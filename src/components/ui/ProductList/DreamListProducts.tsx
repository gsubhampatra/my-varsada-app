import { useQuery } from '@tanstack/react-query';
import ProductCard1 from '../Product/ProductCard1';
import api from '../../../http/axiosconfig';
import { API_ROUTES } from '../../../kv';
import ProductListLoading from '../Layout/Loading/ProductListLoading';
import ErrorBox from '../Layout/Error/ErrorBox';
import EmptyBox from '../Layout/Empty/EmptyBox';

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
              },
            ];
          },
        ];
      };
    },
  ];
}

async function fetchDreamList(): Promise<DreamListData> {
  const res = await api.get(API_ROUTES.USER.GET_DREAM_LIST);
  return res.data;
}

export default function DreamListProducts() {
  const { data, isError, isLoading } = useQuery<DreamListData>({
    queryKey: ['dreamlist'],
    queryFn: fetchDreamList,
  });

  if (isLoading) return <ProductListLoading isShowFilters={false} />;
  if (isError) return <ErrorBox text="Error fetching dreamlist" />;
  if (data?.dreamlist.length > 0) {
    return (
      <div className={`grid grid-cols-4 gap-4`}>
        {data.dreamlist.map((obj, index) => (
          <ProductCard1
            img={obj.product.ProductColor[0].medias[0].url}
            key={index}
            productId={obj.productId.toString()}
            product_name={obj.product.product_name}
            price={obj.product.price}
          />
        ))}
      </div>
    );
  } else {
    return <EmptyBox text="No products in dreamlist" />;
  }
}
