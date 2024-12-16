import { Checkbox, Divider, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import ProductCheckOutCard from '../Product/ProductCheckOutCard';
import { BagData } from '../../../types/ResponceTypes';
import { API_ROUTES } from '../../../kv';
import api from '../../../http/axiosconfig';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { postCalculateCheckout } from '../../../hooks/mutations';
import {
  useBagStore,
  useCheckoutCalculateStore,
  useCouponBoxStore,
} from '../../../store/useStore';
import Address from './Address';
import ErrorBox from '../Layout/Error/ErrorBox';
import EmptyBox from '../Layout/Empty/EmptyBox';

async function fetchBag(): Promise<BagData> {
  const res = await api.get(API_ROUTES.USER.GET_FROM_BAG);
  return res.data;
}

export default function ProductSelect() {
  const [selectedBagIds, setSelectedBagIds] = useState<string[]>([]);
  const { setSelectedBagIdsStore } = useBagStore();
  const { setCheckoutCalculate } = useCheckoutCalculateStore();
  const { isCoinRedeemed, coupon } = useCouponBoxStore();

  const { data, isLoading, isError } = useQuery<BagData>({
    queryKey: ['bag'],
    queryFn: fetchBag,
  });

  const mutation = useMutation({
    mutationFn: postCalculateCheckout,
    onSuccess: (data) => {
      console.log('Checkout calculated', data);
      setCheckoutCalculate(data);
    },
    onError: (error: { response: { data: { msg: string } } }) => {
      console.log(error);
      alert(error.response.data.msg);
    },
  });

  useEffect(() => {
    if (selectedBagIds.length > 0) {
      mutation.mutate({ data: selectedBagIds, coupon, isCoin: isCoinRedeemed });
    }
    setSelectedBagIdsStore(selectedBagIds);
  }, [selectedBagIds, coupon, isCoinRedeemed]);

  if (isLoading)
    return (
      <Skeleton.Node
        active={true}
        style={{
          width: '100%',
          height: 300,
        }}
      />
    );
  if (isError) return <ErrorBox text="Error Fetching Bag" />;
  if (data?.bag.length == 0) return <EmptyBox text="Varsada Bag Is Empty" />;

  const handleCheckboxChange = (e: CheckboxChangeEvent, bagId: string) => {
    const { checked } = e.target;
    setSelectedBagIds((prev) =>
      checked ? [...prev, bagId] : prev.filter((id) => id !== bagId)
    );
  };

  const isSelected = (bagId: string) => selectedBagIds.includes(bagId);

  return (
    <div>
      <Address />
      <div>
        <Checkbox
          indeterminate={
            selectedBagIds.length > 0 && selectedBagIds.length < data.bag.length
          }
          checked={selectedBagIds.length === data.bag.length}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedBagIds(data.bag.map((item) => item.id));
            } else {
              setSelectedBagIds([]);
            }
          }}
        >
          <span className="ml-2 body1 text-black">
            {selectedBagIds.length}/{data.bag.length} selected
          </span>
        </Checkbox>
      </div>

      {data.bag.map((item) => (
        <div key={item.id}>
          <Divider />
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex justify-start items-start gap-4">
              <Checkbox
                checked={isSelected(item.id)}
                onChange={(e) => handleCheckboxChange(e, item.id)}
              ></Checkbox>

              <ProductCheckOutCard
                img={item.color.medias[0].url}
                title={item.product.product_name}
                color={item.color.color_name}
                price={item.product.price}
                selectedSize={item.size}
                quantity={item.quantity}
                sizes={item.product.sizeAvailable}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Display selected bag IDs */}
      <div className="mt-4">
        <strong>Selected Bag IDs:</strong> {JSON.stringify(selectedBagIds)}
      </div>
    </div>
  );
}
