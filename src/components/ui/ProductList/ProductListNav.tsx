import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { useProductFilter } from '../../../context/ProductFiltersContext';
import { Filter } from '../../../types/productTypes';

export default function ProductListNav() {
  const { setProductFilters } = useProductFilter();

  return (
    <>
      <div className="flex justify-between items-center">
        <Breadcrumb
          items={[
            { title: <Link to="/">Home</Link> },
            { title: 'Product Listing' },
          ]}
        />
        <select
          name="sortby"
          className="p-2 px-4 bg-gray-200 rounded-md"
          defaultValue={'new'}
          onChange={(e) => {
            setProductFilters(
              (prev) => ({ ...prev, sort: e.target.value }) as Filter
            );
          }}
        >
          <option value="new">What's New</option>
          <option value="lth">Price Low to High</option>
          <option value="htl">Price high to low</option>
        </select>
      </div>
    </>
  );
}
