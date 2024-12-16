import { Slider } from 'antd';
import type { SliderSingleProps } from 'antd';
import { Filter } from '../../../../types/productTypes';

const marks: SliderSingleProps['marks'] = {
  0: {
    style: {
      color: '#aaa',
    },
    label: <strong>0 Rs</strong>,
  },
  7000: {
    style: {
      color: '#aaa',
    },
    label: <strong>7000 Rs</strong>,
  },
};

export default function FilterPrice({
  setFilters,
}: {
  setFilters: React.Dispatch<React.SetStateAction<Filter | undefined>>;
}) {
  const onChangeSlider = (val: number[]) => {
    console.log(val);
    if (val[0] < val[1]) {
      setFilters(
        (prev) => ({ ...prev, min_price: val[0], max_price: val[1] }) as Filter
      );
    } else {
      setFilters(
        (prev) => ({ ...prev, min_price: val[1], max_price: val[0] }) as Filter
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h4 className="font-bold text-xl">Price</h4>
        {/* <button className='font-semibold text-secondary text-sm rounded-lg'> set price</button> */}
      </div>
      <div className="px-4">
        <Slider
          range
          marks={marks}
          // tooltip={{ open: true }}
          defaultValue={[100, 7000]}
          min={0}
          max={10000}
          step={500}
          onChange={onChangeSlider}
        />
      </div>
    </div>
  );
}
