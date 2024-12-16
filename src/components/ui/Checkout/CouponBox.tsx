import { Checkbox } from 'antd';
import { useCouponBoxStore } from '../../../store/useStore';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../../http/axiosconfig';
import { API_ROUTES } from '../../../kv';

interface CoinData {
  status: boolean;
  coins: {
    amount: number;
  };
}

async function fetchCoin(): Promise<CoinData> {
  const res = await api.get(API_ROUTES.USER.GET_COINS);
  if (!res.status) throw new Error('Failed to fetch coin data');
  return res.data;
}

export default function CouponBox() {
  const { setIsCoinRedeemed, setCoupon } = useCouponBoxStore();
  const [couponState, setCouponState] = useState<string>('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponState(e.target.value);
  };

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    const { checked } = e.target;
    setIsCoinRedeemed(checked);
  };

  const { data, isError, isLoading } = useQuery<CoinData>({
    queryKey: ['coin'],
    queryFn: fetchCoin,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <>
      <p className="body1">Have a Coupon ?</p>

      <div className="relative">
        <input
          type="text"
          name=""
          id=""
          className="p-2 bg-transparent border border-gray-400 rounded-sm w-full"
          placeholder="Coupon Code"
          onChange={handleInput}
        />
        <button
          className="absolute right-2 top-0 p-2 bg-transparent text-secondary font-bold "
          onClick={() => setCoupon(couponState)}
        >
          Apply
        </button>
      </div>

      {data && (
        <Checkbox onChange={handleCheckboxChange}>
          Redeem {data.coins.amount} Coins
        </Checkbox>
      )}
    </>
  );
}
