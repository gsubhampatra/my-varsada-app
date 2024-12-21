import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import ProductSelect from "./ProductSelect"; // Import the React Native version
import {
  useAddressAndContactStore,
  useBagStore,
  useCheckoutCalculateStore,
  useCouponBoxStore,
} from "../../../store/useStore"; // Import the React Native stores
import CheckoutCalculated from "./CheckoutCalculate"; // Import the React Native version
import CouponBox from "./CouponBox"; // Import the React Native version

// Define types
interface checkoutPayload {
  bagIdArr: string[];
  coupon: string;
  isCoin: boolean;
  addressId?: number;
}

// Custom hook for messages (simplified)
const useAntMessage = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const success = (msg: string) => {
    setMessage(msg);
    setIsError(false);
    Alert.alert("Success", msg);
  };

  const error = (msg: string) => {
    setMessage(msg);
    setIsError(true);
    Alert.alert("Error", msg);
  };

  const contextHolder = () => {
    return (
      <View>
        {message && (
          <View
            style={[
              styles.messageBox,
              isError ? styles.errorMessage : styles.successMessage,
            ]}
          >
            <Text
              style={
                isError ? styles.errorMessageText : styles.successMessageText
              }
            >
              {message}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return { contextHolder, success, error };
};

export default function ConfirmProduct() {
  const [loading, setLoading] = useState(false);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const { checkoutCalculate } = useCheckoutCalculateStore();
  const { selectedBagIdsStore } = useBagStore();
  const { coupon, isCoinRedeemed } = useCouponBoxStore();
  const { selectedAddressId } = useAddressAndContactStore();
  const { contextHolder, error } = useAntMessage();

  // const mutation = useMutation(postCheckout, {
  //     onSuccess: (data) => {
  //         console.log(data);
  //         if (data.status) {
  //             if (data.redirectUrl) {
  //                 console.log(data.redirectUrl);
  //                 setIframeUrl(data.redirectUrl);
  //             }
  //         } else {
  //             error(data.msg);
  //             setLoading(false);
  //         }
  //     },
  //     onError: (er) => {
  //         console.log(er);
  //         error('Something went wrong');
  //         setLoading(false);
  //     },
  // });

  const handleSubmit = async () => {
    setLoading(true);
    const data: checkoutPayload = {
      bagIdArr: selectedBagIdsStore,
      coupon,
      isCoin: isCoinRedeemed,
      addressId: selectedAddressId,
    };
    console.log(data);
    // mutation.mutate(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (data.addressId) {
      console.log("success", "payment successful with", data.addressId);
      setIframeUrl("https://www.example.com/payment-success");
    } else {
      error("No address selected");
      setLoading(false);
    }
  };

  if (iframeUrl) {
    //  window.location.href = iframeUrl;
    Alert.alert("Payment Redirect", "Redirecting to payment page");
    setIframeUrl(null);
  }

  return (
    <ScrollView style={styles.container}>
      {contextHolder()}
      <View style={styles.contentContainer}>
        <View style={styles.productSelectContainer}>
          <ProductSelect />
        </View>
        <View style={styles.checkoutContainer}>
          {checkoutCalculate && selectedBagIdsStore.length > 0 && (
            <>
              <CheckoutCalculated checkoutCalculate={checkoutCalculate} />
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.checkoutButtonText}>checkout</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  productSelectContainer: {
    flex: 1,
  },
  checkoutContainer: {
    flex: 1,
  },
  checkoutButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  checkoutButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  messageBox: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    backgroundColor: "#FFBABA",
  },
  successMessage: {
    backgroundColor: "#a5f3a5",
  },
  errorMessageText: {
    color: "#D8000C",
  },
  successMessageText: {
    color: "#1f661f",
  },
});
