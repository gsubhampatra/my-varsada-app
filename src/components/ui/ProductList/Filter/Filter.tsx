import { Divider } from 'antd';
import FilterCategory from './FilterCategory';
import FilterPrice from './FilterPrice';
import FilterColor from './FilterColor';
import FilterSize from './FilterSize';
// import FilterStyle from './FilterStyle';
import { useProductFilter } from '../../../../context/ProductFiltersContext';

export default function Filter() {
  const { setProductFilters, productFilters } = useProductFilter();
  return (
    <div className="">
      <Divider />
      <FilterCategory />
      <Divider />
      <FilterPrice setFilters={setProductFilters} />
      <Divider />
      <FilterColor
        setFilters={setProductFilters}
        ColorFilter={productFilters?.color}
      />
      <Divider />
      <FilterSize
        setFilters={setProductFilters}
        Sizefilter={productFilters?.size}
      />
      {/* <Divider />
      <FilterStyle /> */}
    </div>
  );
}
