import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
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
  const [loading, setLoading] = React.useState(false);
  const [iframeUrl, setIframeUrl] = React.useState<string>();
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

  const handleSubmit = async () => {
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

  if (iframeUrl) {
    Linking.openURL(iframeUrl);
  }

  return (
    <>
      {contextHolder}
      <View style={styles.container}>
        <View style={styles.left}>
          <ProductSelect />
        </View>
        <View style={styles.right}>
          <CouponBox />
          {checkoutCalculate && selectedBagIdsStore.length > 0 ? (
            <>
              <CheckoutCalculated checkoutCalculate={checkoutCalculate} />

              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.button}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.buttonText}>Checkout</Text>
                )}
              </TouchableOpacity>
            </>
          ) : null}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
  },
  button: {
    backgroundColor: '#1890ff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

