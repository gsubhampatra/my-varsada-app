import { Checkbox } from 'antd';
import type { GetProp } from 'antd';
import { useState } from 'react';

export default function FilterStyle() {
  const [isViewMoreStyle, setIsViewMoreStyle] = useState(false);

  const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (
    checkedValues
  ) => {
    console.log('checked = ', checkedValues);
  };

  const options = [
    { label: 'Casula', value: 'Apple' },
    { label: 'Formal', value: 'Pear' },
    { label: 'Party', value: 'Orange' },
    { label: 'Gym', value: 'hoode' },
    { label: 'Swim Wear', value: 'jeans' },
    { label: 'Denim', value: 'denim' },
    { label: 'Swim', value: 'swim' },
    { label: 'Active', value: 'active' },
  ];
  return (
    <div>
      <div className="flex flex-col gap-4">
        <h4>Styles</h4>
        <Checkbox.Group
          options={isViewMoreStyle ? options : options.splice(0, 5)}
          onChange={onChange}
          className="body1 text-[#00000099] leading-5 font-[500] flex flex-col gap-3"
        />
      </div>
      <button
        className="mt-4 text-secondary body1"
        onClick={() => setIsViewMoreStyle(!isViewMoreStyle)}
      >
        {!isViewMoreStyle ? '+4 more' : 'View Less'}
      </button>
    </div>
  );
}
