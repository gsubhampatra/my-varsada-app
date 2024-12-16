import { useQuery } from '@tanstack/react-query';
import api from '../../../../http/axiosconfig';
import { API_ROUTES } from '../../../../kv';
import { Filter } from '../../../../types/productTypes';

interface SizeData {
  status: boolean;
  sizes: {
    size: string;
  }[];
}

async function fetchSizes(): Promise<SizeData> {
  const res = await api.get(API_ROUTES.FILTER.SIZES);
  return res.data;
}

export default function FilterSize({
  setFilters,
  Sizefilter,
}: {
  setFilters: React.Dispatch<React.SetStateAction<Filter | undefined>>;
  Sizefilter?: string;
}) {
  const { data, isLoading } = useQuery<SizeData>({
    queryKey: ['sizes'],
    queryFn: fetchSizes,
  });

  if (isLoading) return <div>Loading...</div>;

  if (data)
    return (
      <div className="flex flex-col gap-4">
        <h4 className="font-bold text-xl">Size</h4>
        <div className="grid grid-cols-3 gap-4 max-w-[250px]">
          {data.sizes.map((size, index) => {
            return (
              <button
                className={
                  'py-2 px-4 caption text-black rounded-full text-center ' +
                  (size.size === Sizefilter
                    ? 'bg-secondary text-white'
                    : 'bg-gray-200')
                }
                key={index}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, size: size.size }) as Filter)
                }
              >
                <p>{size.size}</p>
              </button>
            );
          })}
        </div>
      </div>
    );
}
