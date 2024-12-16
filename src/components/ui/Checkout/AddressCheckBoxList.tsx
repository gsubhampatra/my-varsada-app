import { useAddressAndContactStore } from '../../../store/useStore';
import { API_ROUTES } from '../../../kv';
import api from '../../../http/axiosconfig';
import { Address, Contact } from '../../../types/ResponceTypes';
import { useMutation } from '@tanstack/react-query';
import { Checkbox } from 'antd';
import EmptyBox from '../Layout/Empty/EmptyBox';

async function updateDefaultAddress(addressId: number) {
  const res = await api.post(API_ROUTES.USER.ADDRESS.UPDATE_DEFAULT_ADDRESS, {
    addressId,
  });
  return res.data;
}

export default function AddressCheckBoxList() {
  const {
    contactsAndAddress,
    selectedAddressId,
    setSelectedAddressId,
    setSelectedContactId,
    setSelectedContactAndAddress,
    setSelectedDefaultAddressId,
    selectedDefaultAddressId,
  } = useAddressAndContactStore();

  const mutation = useMutation({
    mutationFn: updateDefaultAddress,
    onSuccess: (data) => {
      console.log('address changed', data);
    },
    onError: (error: { response: { data: { msg: string } } }) => {
      console.log(error);
      alert('error setting default address');
    },
  });

  const handleCheckboxChange = (
    checked: boolean,
    contactId: number,
    addressId: number,
    contact: Contact,
    address: Address
  ) => {
    if (checked) {
      setSelectedContactId(contactId);
      setSelectedAddressId(addressId);
      setSelectedContactAndAddress({ contact, address });
    } else {
      setSelectedContactId(null);
    }
  };

  const handleMakeDefault = (addressId: number) => {
    mutation.mutate(addressId);
    setSelectedDefaultAddressId(addressId);
  };

  if (contactsAndAddress?.contact.length == 0)
    return <EmptyBox text="No Address Found" />;

  if (contactsAndAddress)
    return (
      <>
        {contactsAndAddress?.contact.map((contact, index) => (
          <div
            className={index === 0 ? 'py-4' : 'py-4 border-t-2'}
            key={contact.id}
          >
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold">{contact.name}</p>
              <span className="text-lg"> | </span>
              <span className="text-lg">{contact.phone}</span>
            </div>
            {contact.Address.map((address) => (
              <div
                className="flex gap-4 p-4 bg-white rounded-lg m-4 mx-2"
                key={address.id}
              >
                <div>
                  <Checkbox
                    checked={selectedAddressId === address.id}
                    onChange={(e) =>
                      handleCheckboxChange(
                        e.target.checked,
                        contact.id,
                        address.id,
                        contact,
                        address
                      )
                    }
                  />
                </div>
                <div className="flex justify-between w-full">
                  <div>
                    <p className="text-lg">
                      {address.address}, {address.locality}, {address.city},{' '}
                      {address.state}
                    </p>
                    <p className="text-lg">{address.postal_code}</p>
                    <Checkbox
                      style={{ marginTop: 8 }}
                      checked={selectedDefaultAddressId === address.id}
                      onChange={() => handleMakeDefault(address.id)}
                    >
                      <span className="text-sm">make default address</span>
                    </Checkbox>
                  </div>
                  <div className="flex gap-4 items-start">
                    <button>edit</button>
                    <button>delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </>
    );
}
