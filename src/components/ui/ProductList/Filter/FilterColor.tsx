import { useQuery } from '@tanstack/react-query';
import api from '../../../../http/axiosconfig';
import { API_ROUTES } from '../../../../kv';
import { Skeleton } from 'antd';
import { Filter } from '../../../../types/productTypes';

interface ColorData {
  status: boolean;
  colors: {
    color_name: string;
    hex_value: string;
  }[];
}

async function fetchColors(): Promise<ColorData> {
  const res = await api.get(API_ROUTES.FILTER.COLORS);
  return res.data;
}

export default function FilterColor({
  setFilters,
  ColorFilter,
}: {
  setFilters: React.Dispatch<React.SetStateAction<Filter | undefined>>;
  ColorFilter?: string;
}) {
  const { data, isLoading } = useQuery<ColorData>({
    queryKey: ['colors'],
    queryFn: fetchColors,
  });

  if (isLoading) return <Skeleton active />;

  if (data)
    return (
      <div className="flex flex-col gap-4">
        <h4 className="font-bold text-xl">Colors</h4>
        <div className="grid grid-cols-5 gap-4 max-w-[250px] px-2">
          {data.colors.map((color, index) => {
            return (
              <button
                className="p-1 aspect-square rounded-full cursor-pointer"
                style={{
                  backgroundColor: color.hex_value,
                  outline:
                    ColorFilter && color.hex_value == ColorFilter
                      ? '2px solid'
                      : 'none',
                  outlineColor:
                    ColorFilter && color.hex_value == ColorFilter
                      ? color.hex_value
                      : 'none',
                  border:
                    ColorFilter && color.hex_value == ColorFilter
                      ? '2px solid white'
                      : 'none',
                }}
                key={index}
                onClick={() =>
                  setFilters(
                    (prev) => ({ ...prev, color: color.hex_value }) as Filter
                  )
                }
              ></button>
            );
          })}
        </div>
      </div>
    );
}
