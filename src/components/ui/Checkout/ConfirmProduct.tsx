import ProductSelect from './ProductSelect';
import { useState } from 'react';
import api from '../../../http/axiosconfig';
import { API_ROUTES } from '../../../kv';
import {
  useAddressAndContactStore,
  useBagStore,
  useCheckoutCalculateStore,
  useCouponBoxStore,
} from '../../../store/useStore';
import CheckoutCalculated from './CheckoutCalculate';
import CouponBox from './CouponBox';
import { useAntMessage } from '../../../hooks/AntdMessageHooks';
import { useMutation } from '@tanstack/react-query';

interface checkoutPayload {
  bagIdArr: string[];
  coupon: string;
  isCoin: boolean;
  addressId?: number;
}

async function postCheckout(
  data: checkoutPayload
): Promise<
  { status: true; redirectUrl: string } | { status: false; msg: string }
> {
  if (data.addressId) {
    const res = await api.post(API_ROUTES.PAYMENT.PAY, data);
    return res.data;
  }
  return { status: false, msg: 'No address selected' };
}

export default function ConfirmProduct() {
  const [loading, setLoading] = useState(false);
  const [iframeUrl, setIframeUrl] = useState<string>();
  const { checkoutCalculate } = useCheckoutCalculateStore();
  const { selectedBagIdsStore } = useBagStore();
  const { coupon, isCoinRedeemed } = useCouponBoxStore();
  const { selectedAddressId } = useAddressAndContactStore();
  const { contextHolder, error } = useAntMessage();

  const mutation = useMutation(postCheckout, {
    onSuccess: (data) => {
      console.log(data);
      if (data.status) {
        if (data.redirectUrl) {
          console.log(data.redirectUrl);
          setIframeUrl(data.redirectUrl);
        }
      } else {
        error(data.msg);
        setLoading(false);
      }
    },
    onError: (er) => {
      console.log(er);
      error('Something went wrong');
      setLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    // this is made static for now, but later fetch from databse
    const data = {
      bagIdArr: selectedBagIdsStore,
      coupon,
      isCoin: isCoinRedeemed,
      addressId: selectedAddressId,
    };

    console.log(data);
    mutation.mutate(data);
  };

  if (iframeUrl) window.location.href = iframeUrl;

  return (
    <>
      {contextHolder}
      <div className="grid grid-cols-2 gap-11">
        <ProductSelect />
        <div className="flex flex-col gap-4">
          <CouponBox />
          {checkoutCalculate && selectedBagIdsStore.length > 0 ? (
            <>
              <CheckoutCalculated checkoutCalculate={checkoutCalculate} />

              <button
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
                className="bg-secondary rounded-md p-3 text-white"
              >
                checkout
              </button>
            </>
          ) : null}
        </div>

        {/* model kind of.. */}
        {/* {iframeUrl && (
          <>
            <div
              className="overlay"
              onClick={() => {
                setIframeUrl('');
              }}
            >
              <iframe
                className="iframe-container"
                src={iframeUrl}
                style={{ border: 'none' }}
                title="Content Frame"
              />
            </div>
          </>
        )} */}
      </div>
    </>
  );
}
