import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../../http/axiosconfig';
import { API_ROUTES } from '../../../kv';
import { ProductWithImageData } from '../../../types/ResponceTypes';
import { useCategoryTypeStore } from '../../../store/useStore';
import { Divider } from 'antd';
import FilterPrice from '../ProductList/Filter/FilterPrice';
import FilterColor from '../ProductList/Filter/FilterColor';
import FilterSize from '../ProductList/Filter/FilterSize';
import { useCategoryFilter } from '../../../context/CategoryFiltersContext';

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

  // const toggleCategoryList = (id: string) => {
  //   setSelectedCategoryTypeId((prev) => (prev === id ? null : id));
  // };

  const { isLoading } = useQuery<categoryTypeProductData>({
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
    onSuccess: (data) => {
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
    },
  });

  useEffect(() => {
    if (isLoading) {
      setProductForCategoryType([]);
      setIsLoading(true);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <h4 className="font-bold text-xl flex gap-4">
        Category{isLoading ? '...' : null}
      </h4>
      <div className="flex flex-col">
        {categoryType.map((category) => (
          <div className="w-full" key={category.id}>
            <button
              className={`text-start font-semibold text-lg p-2 px-4 flex justify-between items-center w-full rounded-md
                ${selectedCategoryTypeId === category.id.toString() ? ' bg-purple-200 ' : ''}
                `}
              onClick={() => setSelectedCategoryTypeId(category.id.toString())}
            >
              {category.type_name}
              {/* <span
                className={`transform transition-transform duration-300 ${
                  selectedCategoryTypeId === category.id.toString()
                    ? 'rotate-90'
                    : ''
                }`}
              >
                &gt;
              </span> */}
            </button>
            {/* {selectedCategoryTypeId === category.id.toString() && (
              <div className="pl-8">
                <CategoryList categories={category.categories} />
              </div>
            )} */}
          </div>
        ))}
      </div>

      <Divider />
      {/* <div className='p-8 rounded-lg '> */}
      <FilterPrice setFilters={setCategoryFilters} />
      <Divider />
      <FilterColor
        setFilters={setCategoryFilters}
        ColorFilter={categoryFilters?.color}
      />
      <Divider />
      <FilterSize
        setFilters={setCategoryFilters}
        Sizefilter={categoryFilters?.size}
      />
      {/* </div> */}
    </div>
  );
}
