import { useQuery } from '@tanstack/react-query';
import { Checkbox, Skeleton } from 'antd';
import type { GetProp } from 'antd';
import { useState } from 'react';
import api from '../../../../http/axiosconfig';
import { API_ROUTES } from '../../../../kv';
import { CategoryTypeData } from '../../../../types/ResponceTypes';
import { useProductFilter } from '../../../../context/ProductFiltersContext';
import { Filter } from '../../../../types/productTypes';

async function fetchCategory(): Promise<CategoryTypeData> {
  const res = await api.get(API_ROUTES.CATEGORY_TYPE.GET_ALL);
  return res.data;
}

export default function FilterCategory() {
  const [isVewMoreCategory, setIsViewMoreCategory] = useState(false);
  const { setProductFilters } = useProductFilter();

  const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (
    checkedValues
  ) => {
    console.log('checked = ', checkedValues);
    setProductFilters(
      (prev) => ({ ...prev, categoryTypeIds: checkedValues }) as Filter
    );
  };

  const [options, setOptions] = useState<{ label: string; value: number }[]>(
    []
  );

  const { data, isLoading } = useQuery(['category'], fetchCategory, {
    onSuccess(data) {
      console.log(data);
      const transformedOptions = data.categoryType.map((type) => ({
        label: type.type_name,
        value: type.id,
      }));
      setOptions(transformedOptions);
    },
  });

  if (isLoading) return <Skeleton active paragraph />;

  if (data)
    return (
      <div>
        <div className="flex flex-col gap-4">
          <h4>Category</h4>
          <Checkbox.Group
            options={isVewMoreCategory ? options : options.slice(0, 5)}
            onChange={onChange}
            className="body1 text-[#00000099] leading-5 font-[500] flex flex-col gap-3"
          />
        </div>
        <button
          className="mt-4 text-secondary body1"
          onClick={() => setIsViewMoreCategory(!isVewMoreCategory)}
        >
          {!isVewMoreCategory
            ? `+${options.length - options.slice(0, 5).length} more`
            : 'View Less'}
        </button>
      </div>
    );
}
