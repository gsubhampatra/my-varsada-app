import { useState } from 'react';
import AddressCheckBoxList from './AddressCheckBoxList';
import AddAddressBox from './AddAddressBox';

export default function SwitchAddress() {
  const [switchAddress, setSwitchAddress] = useState(true);

  return (
    <div className="w-full">
      <div className="flex justify-end w-full pb-4">
        <button
          className="text-lg font-bold text-secondary"
          onClick={() => setSwitchAddress(false)}
        >
          Add Address
        </button>
      </div>
      {switchAddress ? (
        <AddressCheckBoxList />
      ) : (
        <AddAddressBox setSwitchAddress={setSwitchAddress} />
      )}
    </div>
  );
}
