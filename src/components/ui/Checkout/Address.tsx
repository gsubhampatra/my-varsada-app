import { Divider, Drawer } from 'antd';
import { useState } from 'react';
import SwitchAddress from './SwitchAddress';
import api from '../../../http/axiosconfig';
import { API_ROUTES } from '../../../kv';
import {
  Address as AddressData,
  AddressAndContactsData,
} from '../../../types/ResponceTypes';
import { useQuery } from '@tanstack/react-query';
import ErrorBox from '../Layout/Error/ErrorBox';
import { useAddressAndContactStore } from '../../../store/useStore';

async function fetchAddress(): Promise<AddressAndContactsData> {
  const res = await api.get(API_ROUTES.USER.ADDRESS.GET_CONTACT_AND_ADDRESS);
  return res.data;
}

type SelectedData = {
  originalData: AddressAndContactsData;
  defaultContacts: (
    | {
        id: number;
        name: string;
        email: string;
        phone: string;
        address: AddressData;
      }
    | undefined
  )[];
};

export default function Address() {
  const [open, setOpen] = useState(false);
  const {
    setContactsAndAddress,
    selectedContactAndAddress,
    selectedDefaultAddressId,
    setSelectedDefaultAddressId,
    setSelectedAddressId,
    setSelectedContactId,
    setSelectedContactAndAddress,
    addedNewAddress,
  } = useAddressAndContactStore();

  const { isLoading, isError } = useQuery({
    queryKey: ['address', addedNewAddress],
    queryFn: fetchAddress,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log(data);
      setContactsAndAddress(data.originalData);
      if (data?.defaultContacts.length > 0) {
        setSelectedDefaultAddressId(data.defaultContacts[0]?.address?.id);
        setSelectedAddressId(data.defaultContacts[0]?.address?.id);
        if (data.defaultContacts[0]?.id) {
          setSelectedContactId(data.defaultContacts[0]?.id);
        }
        if (data.defaultContacts[0]?.address) {
          setSelectedContactAndAddress({
            contact: data.defaultContacts[0],
            address: data.defaultContacts[0].address,
          });
        }
      }
    },
    select: (data: AddressAndContactsData): SelectedData => {
      const defaultContacts = data?.contact
        .map((contact) => {
          const defaultAddress = contact.Address.find(
            (address) => address.isDefault
          );
          if (defaultAddress) {
            return {
              id: contact.id,
              name: contact.name,
              email: contact.email,
              phone: contact.phone,
              address: defaultAddress,
            };
          }
          return undefined; // explicityly return undefined for clarity
        })
        .filter(Boolean); // Remove undefined entries

      return {
        originalData: data,
        defaultContacts,
      };
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <ErrorBox text="Error Fetching Address" />;
  if (selectedContactAndAddress) {
    return (
      <>
        <div className="flex justify-between mb-8">
          <div>
            <b className="text-xl">Shipping Address </b>
            <b className="text-lg text-gray-400">
              {selectedContactAndAddress.address.id == selectedDefaultAddressId
                ? '(default)'
                : null}
            </b>
            {selectedContactAndAddress.address ? (
              <>
                <div className="flex items-center gap-2">
                  <p className="text-lg">
                    {selectedContactAndAddress.contact.name}
                  </p>
                  <span className="text-lg"> | </span>
                  <span className="text-lg">
                    {selectedContactAndAddress.contact.phone}
                  </span>
                </div>
                <p className="text-lg">
                  {`${selectedContactAndAddress.address.address}, ${selectedContactAndAddress.address.locality}, ${selectedContactAndAddress.address.city}, ${selectedContactAndAddress.address.state}, ${selectedContactAndAddress.address.country}`}
                </p>
                <p className="text-lg">
                  {selectedContactAndAddress.address.postal_code}
                </p>
              </>
            ) : (
              <p className="text-accent">No Default Address Selected</p>
            )}
          </div>
          <div>
            <button
              className="p-1 px-4 bg-secondary text-white font-bold text-sm rounded-lg overflow-hidden"
              onClick={() => setOpen(true)}
            >
              Change
            </button>
          </div>
        </div>
        <Drawer
          title="Saved Address"
          onClose={() => setOpen(false)}
          open={open}
          width={500}
          className="relative"
        >
          <div className="flex justify-center items-center">
            <SwitchAddress />
          </div>
        </Drawer>
        <Divider />
      </>
    );
  }

  if (!selectedContactAndAddress)
    return (
      <>
        <div className="flex justify-between mb-8">
          <div>
            <b className="text-xl">Shipping Address </b>
            <p className="text-accent text-lg">No Address Found</p>
          </div>
          <div>
            <button
              className="p-1 px-4 bg-secondary text-white font-bold text-sm rounded-lg overflow-hidden"
              onClick={() => setOpen(true)}
            >
              Add Address
            </button>
          </div>
        </div>
        <Drawer
          title="Saved Address"
          onClose={() => setOpen(false)}
          open={open}
          width={500}
          className="relative"
        >
          <div className="flex justify-center items-center">
            <SwitchAddress />
          </div>
        </Drawer>
        <Divider />
      </>
    );
}
