import { FilterIcon } from '../../../assets/icons';
import { useProductFilter } from '../../../context/ProductFiltersContext';

type Props = {
  isShowFilters: boolean;
  setIsShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProductListFilterHeader({
  isShowFilters,
  setIsShowFilters,
}: Props) {
  const { setProductFilters } = useProductFilter();

  return (
    <div className="grid grid-cols-[30%_70%] my-4 gap-8">
      <div className="flex justify-between">
        <button
          className="flex justify-center items-center gap-2"
          onClick={() => setIsShowFilters(!isShowFilters)}
        >
          <i>
            <FilterIcon />
          </i>
          <h4>{isShowFilters ? 'Hide Filters' : 'Show Filters'}</h4>
        </button>
        {isShowFilters ? (
          <button
            className="text-[20px] leading-6 text-secondary font-bold"
            onClick={() => setProductFilters(undefined)}
          >
            Clear All
          </button>
        ) : null}
      </div>

      {/* {isShowFilters ? (
        <div className="flex gap-4">
          <div className="bg-secondary py-2 px-4 flex gap-4 caption text-white rounded-full">
            <p>Crop Top</p>
            <button>x</button>
          </div>
          <div className="bg-secondary py-2 px-4 flex gap-4 caption text-white rounded-full">
            <p>Denim</p>
            <button>x</button>
          </div>
          <div className="bg-secondary py-2 px-4 flex gap-4 caption text-white rounded-full">
            <p>Casual</p>
            <button>x</button>
          </div>
        </div>
      ) : null} */}
    </div>
  );
}
