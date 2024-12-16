import { Breadcrumb, Select } from 'antd';
import { Link } from 'react-router-dom';

export default function DreamListNav() {
  const handleChange = () => {
    console.log('changed');
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <Breadcrumb
          items={[{ title: <Link to="/">Home</Link> }, { title: 'Dream List' }]}
        />
        <Select
          defaultValue="new"
          style={{ width: 250 }}
          onChange={handleChange}
          options={[
            { value: 'htl', label: 'Sort By: Price High to Low' },
            { value: 'lth', label: 'Sort By: Price Low to High' },
            { value: 'new', label: "Sort By: What's new" },
          ]}
        />
      </div>
    </>
  );
}
