import { Breadcrumb } from 'antd';
import Footer from '../ui/Layout/Footer';
import Navbar from '../ui/Layout/Navbar';
import SafeArea from '../ui/Layout/SafeArea';
import { Link, useSearchParams } from 'react-router-dom';
import SideNav from '../ui/Category/SideNav';
import CategoryProductList from '../ui/Category/CategoryProductList';
import { useQuery } from '@tanstack/react-query';
import api from '../../http/axiosconfig';
import { API_ROUTES } from '../../kv';
import { useCategoryFilter } from '../../context/CategoryFiltersContext';
import { Filter } from '../../types/productTypes';
import { CategoryTypeData } from '../../types/ResponceTypes';

async function getCategories(): Promise<CategoryTypeData> {
  const res = await api.get(API_ROUTES.CATEGORY_TYPE.GET_ALL);
  return res.data;
}

export default function Category() {
  const [searchParams] = useSearchParams();
  const categoryTypeId = searchParams.get('categoryTypeId');
  const { setCategoryFilters } = useCategoryFilter();

  const { data } = useQuery<CategoryTypeData>({
    queryKey: ['category'],
    queryFn: getCategories,
    onSuccess(data) {
      console.log(data);
    },
  });

  return (
    <SafeArea>
      <Navbar />
      <div className="w-full p-11">
        <div className="flex justify-between">
          <Breadcrumb
            items={[{ title: <Link to="/">Home</Link> }, { title: 'Category' }]}
          />
          <select
            name="sortby"
            className="p-2 px-4 bg-gray-200 rounded-md"
            defaultValue={'new'}
            onChange={(e) => {
              setCategoryFilters(
                (prev) => ({ ...prev, sort: e.target.value }) as Filter
              );
            }}
          >
            <option value="new">What's New</option>
            <option value="lth">Price Low to High</option>
            <option value="htl">Price high to low</option>
          </select>
        </div>
        <div className="grid transition-all grid-cols-[30%_70%] gap-8 my-4">
          {data?.categoryType && (
            <SideNav
              seletctedCategorytypeId={categoryTypeId}
              categoryType={data.categoryType}
            />
          )}
          <CategoryProductList />
        </div>
      </div>
      <Footer />
    </SafeArea>
  );
}
