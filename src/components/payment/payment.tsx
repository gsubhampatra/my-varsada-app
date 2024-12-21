import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import { router } from "expo-router";
import { useBagStore, useCheckoutCalculateStore, useCouponBoxStore } from "@/src/store/useStore";
import { GColors } from "@/src/constants/GStyles";
import { useToast } from "@/src/hooks/AntdMessageHooks";
import { useMutation } from "@tanstack/react-query";
import { postCalculateCheckout } from "@/src/hooks/mutations";

// Coupon Input Component
interface CouponInputProps {
    applyCoupon: () => void;
}
const CouponInput: React.FC<CouponInputProps> = React.memo(({ applyCoupon }) => {
  const { coupon, setCoupon, isCoinRedeemed, setIsCoinRedeemed } =
    useCouponBoxStore();
  return (
    <View style={styles.couponContainer}>
      <View style={styles.inputContainer}>
        <FontAwesome name="percent" size={20} color="#888" />
        <TextInput
          placeholder="Coupon Code"
          style={styles.input}
          value={coupon}
          onChangeText={setCoupon}
        />
      </View>
      <TouchableOpacity onPress={applyCoupon}>
        <Text style={styles.applyButton}>Apply</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.redeemContainer}
        onPress={() => setIsCoinRedeemed(!isCoinRedeemed)}
      >
        <View style={styles.checkboxContainer}>
          <View style={[styles.checkbox, isCoinRedeemed && styles.checkboxSelected]}>
            {isCoinRedeemed && <View style={styles.checkboxInner} />}
          </View>
        </View>
        <Text style={styles.redeemText}>Redeem </Text>
        <FontAwesome5 name="coins" size={15} color="#FFD700" />
        <Text style={styles.redeemText}> 21 coins</Text>
      </TouchableOpacity>
    </View>
  );
});

// Price Details Component
interface PriceDetailsProps {
    subTotal: number | null;
    shipping: number | null;
    discount: number | null;
    coinsRedeemed: number | null;
    membershipDiscount: number | null;
    coupon: number | null;
    total: number | null;
    items:number;
}
const PriceDetails: React.FC<PriceDetailsProps> = React.memo(({
    subTotal,
    shipping,
    discount,
    coinsRedeemed,
    membershipDiscount,
    coupon,
    total,
    items
}) => {
  return (
    <View style={styles.priceDetailsContainer}>
      <Text style={styles.priceDetailsTitle}>Price Details ({items} Items)</Text>
      <View style={styles.priceItem}>
        <Text style={styles.priceLabel}>Sub total</Text>
          <Text style={styles.priceValue}>₹{subTotal?.toFixed(2)}</Text>
      </View>
        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>Shipping Charges</Text>
            <Text style={styles.priceValue}>₹{shipping?.toFixed(2)}</Text>
        </View>
      <View style={styles.priceItem}>
        <Text style={styles.priceLabel}>Discount</Text>
          <Text style={[styles.priceValue, styles.negativePrice]}>
          -₹{discount?.toFixed(2)}
        </Text>
      </View>
      <View style={styles.priceItem}>
        <Text style={styles.priceLabel}>Coins Redeemed</Text>
          <Text style={[styles.priceValue, styles.negativePrice]}>
          -₹{coinsRedeemed?.toFixed(2)}
        </Text>
      </View>
      <View style={styles.priceItem}>
        <Text style={styles.priceLabel}>Membership Discount</Text>
          <Text style={[styles.priceValue, styles.negativePrice]}>
          -₹{membershipDiscount?.toFixed(2)}
        </Text>
      </View>
      <View style={styles.priceItem}>
        <Text style={styles.priceLabel}>Coupon</Text>
          <Text style={[styles.priceValue, styles.negativePrice]}>
          -₹{coupon?.toFixed(2)}
        </Text>
      </View>
      <View style={styles.priceTotal}>
        <Text style={styles.totalLabel}>Price Details</Text>
        <Text style={styles.totalValue}>₹{total?.toFixed(2)}</Text>
      </View>
    </View>
  );
});

// Payment Option Component
interface PaymentOptionProps {
    onAddCardPress: () => void;
}
const PaymentOptions: React.FC<PaymentOptionProps> = React.memo(({onAddCardPress}) => {
  const [isCreditCardOpen, setIsCreditCardOpen] = useState(false);

  return (
    <View style={styles.paymentOptionsContainer}>
      <Text style={styles.paymentTitle}>Mode of Payment</Text>
      <View style={styles.paymentMethod}>
        <Text style={styles.paymentMethodText}>UPI</Text>
        <View style={styles.radioContainer}>
            <View style={styles.radio} />
        </View>
      </View>
        <View style={styles.paymentMethod}>
        <Text style={styles.paymentMethodText}>Credit/ Debit Card</Text>
        <TouchableOpacity
          style={styles.cardArrow}
          onPress={() => setIsCreditCardOpen(!isCreditCardOpen)}
        >
          <AntDesign
            name={isCreditCardOpen ? "down" : "right"}
            size={16}
            color={GColors.black}
          />
        </TouchableOpacity>
      </View>

      {isCreditCardOpen && (
        <View style={styles.cardDetails}>
          <TouchableOpacity style={styles.addNewCardButton} onPress={onAddCardPress}>
            <Text style={styles.addNewCardText}>+ Add new Card</Text>
          </TouchableOpacity>
          <View style={styles.cardItem}>
            <FontAwesome5 name="cc-visa" size={20} color={GColors.primary} />
              <Text style={styles.paymentCardText}>HDFC Bank Debit Card</Text>
                <View style={styles.radioContainer}>
                    <View style={styles.radio} />
                </View>
          </View>
             <View style={styles.cardItem}>
                 <FontAwesome5 name="cc-visa" size={20} color={GColors.primary} />
              <Text style={styles.paymentCardText}>HDFC Bank Debit Care</Text>
                <View style={styles.radioContainer}>
                    <View style={styles.radio} />
                </View>
          </View>

        </View>
      )}
      <View style={styles.paymentMethod}>
        <Text style={styles.paymentMethodText}>Cash On Delivery</Text>
           <View style={styles.radioContainer}>
                <View style={styles.radio} />
            </View>
      </View>
    </View>
  );
});

// Add New Card Modal Component
interface AddCardModalProps {
    visible: boolean;
    onClose: () => void;
}
const AddCardModal: React.FC<AddCardModalProps> = ({ visible, onClose }) => {
    const [cardHolderName, setCardHolderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvvNumber, setCvvNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');

  return (
    <Modal visible={visible} animationType="slide" transparent>
       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity style={styles.closeModalButton} onPress={onClose}>
              <AntDesign name="close" size={24} color={GColors.white} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add Debit/ Credit card</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Card Holder Name"
                style={styles.input}
                value={cardHolderName}
                  onChangeText={setCardHolderName}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Card Number"
                  keyboardType="numeric"
                style={styles.input}
                  value={cardNumber}
                onChangeText={setCardNumber}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="CVV Number"
                  keyboardType="numeric"
                style={styles.input}
                  value={cvvNumber}
                onChangeText={setCvvNumber}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Expiry Date"
                style={styles.input}
                  value={expiryDate}
                onChangeText={setExpiryDate}
              />
            </View>
            <TouchableOpacity style={styles.saveCardButton}>
              <Text style={styles.saveCardText}>Save Card</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
       </TouchableWithoutFeedback>
    </Modal>
  );
};

const CheckoutScreen: React.FC = () => {
  const [isAddCardModalVisible, setIsAddCardModalVisible] = useState(false);
    const { selectedBagIdsStore } = useBagStore();
  const { coupon, isCoinRedeemed } = useCouponBoxStore();
  const { setCheckoutCalculate, checkoutCalculate } = useCheckoutCalculateStore();
    const { success, error, warning } = useToast();
    const [loading, setLoading] = useState(false);


    // mutation for checkout calculation
  const { mutate: calculateCheckout } = useMutation({
        mutationFn: postCalculateCheckout,
        onSuccess: (data) => {
            setCheckoutCalculate(data);
            setLoading(false);
        },
        onError: () => {
            error("Something went wrong! Please Try Again.");
            setLoading(false);
        },
    });


     useEffect(() => {
         setLoading(true)
       if (selectedBagIdsStore.length) {
           calculateCheckout({
               data: selectedBagIdsStore,
               coupon,
               isCoin: isCoinRedeemed,
           });
       }else{
           setLoading(false);
       }
    }, [selectedBagIdsStore, coupon, isCoinRedeemed]);


    const handleApplyCoupon = useCallback(() => {
    if (selectedBagIdsStore.length) {
        setLoading(true)
         calculateCheckout({
              data: selectedBagIdsStore,
              coupon,
                isCoin: isCoinRedeemed,
            });
        }else{
            warning("Please Select Item First.");
        }
    }, [selectedBagIdsStore, coupon, isCoinRedeemed]);

    const handleOpenAddCardModal = useCallback(() => {
        setIsAddCardModalVisible(true);
    }, [])
    const handleCloseAddCardModal = useCallback(() => {
      setIsAddCardModalVisible(false);
    }, []);

    const handlePlaceOrder = useCallback(() => {
      router.push("/order-placed");
    }, []);

  return (
      <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
           <TouchableOpacity onPress={() => router.back()}>
             <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
            <Text style={styles.headerText}>Varsada Bag</Text>
            <View style={styles.headerIcons}>
                <FontAwesome name="search" size={20} color="black" />
                <TouchableOpacity style={styles.bagIcon}>
                    <FontAwesome name="shopping-bag" size={20} color="black" />
                </TouchableOpacity>
                 <TouchableOpacity style={styles.profileIcon}>
                    <FontAwesome name="user" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </View>
            <CouponInput applyCoupon={handleApplyCoupon}/>
        {!loading ? (
          <PriceDetails
              items={selectedBagIdsStore.length}
            subTotal={checkoutCalculate?.subTotal}
            shipping={checkoutCalculate?.shipping}
            discount={checkoutCalculate?.discount}
            coinsRedeemed={checkoutCalculate?.coinsRedeemed}
            membershipDiscount={checkoutCalculate?.membershipDiscount}
            coupon={checkoutCalculate?.coupon}
            total={checkoutCalculate?.total}
          />
        ) : (
          <Text style={{ alignItems: "center" }}>Loading....</Text>
        )}
        <PaymentOptions onAddCardPress={handleOpenAddCardModal}/>
      </ScrollView>
        <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
              <Text style={styles.placeOrderText}>Place Order</Text>
          </TouchableOpacity>
      <AddCardModal
        visible={isAddCardModalVisible}
        onClose={handleCloseAddCardModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
    },
  container: {
    flex: 1,
      backgroundColor:GColors.white,
  },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10
    },
    headerIcons:{
        flexDirection:'row',
        gap:15,
        alignItems: 'center',
    },
    bagIcon: {
        position: 'relative',
    },
    profileIcon: {
        position: 'relative',
    },
  couponContainer: {
    padding: 15,
      borderBottomWidth:1,
      borderBottomColor:GColors.lightgrey
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
    redeemContainer:{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
  applyButton: {
    color: GColors.primary,
      fontWeight:'bold',
    fontSize: 16,
  },
  checkboxContainer: {
    padding: 2,
      marginRight:5
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: GColors.primary,
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: GColors.white,
    borderRadius: 2,
  },
  redeemText: {
    fontSize: 16,
      marginLeft: 2
  },
  priceDetailsContainer: {
    padding: 15,
      borderBottomWidth:1,
      borderBottomColor:GColors.lightgrey
  },
  priceDetailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  priceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  priceLabel: {
    fontSize: 16,
  },
    priceValue: {
        fontSize: 16,
    },
  negativePrice: {
    color: "red",
  },
  priceTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
      paddingTop:10
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  paymentOptionsContainer: {
    padding: 15,
      borderBottomWidth:1,
      borderBottomColor:GColors.lightgrey
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
    paymentMethod: {
        flexDirection: "row",
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10
    },
    paymentMethodText:{
        fontSize:16,
        fontWeight:'500'
    },
    radioContainer:{
        padding:2,
    },
    radio:{
       width:20,
       height:20,
       borderWidth:1,
       borderColor:GColors.grey,
        borderRadius: 10
    },
  cardDetails: {
        paddingLeft:10,
    },
  cardArrow: {
        padding:5
    },
  addNewCardButton: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    marginBottom: 10,
    alignItems: "flex-start",
  },
  addNewCardText: {
    fontSize: 16,
    color: GColors.primary,
      fontWeight:'500'
  },
    cardItem: {
        flexDirection: "row",
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:5
    },
    paymentCardText:{
      fontSize:14,
      marginLeft: 5,
        flex:1,
        fontWeight:'400'
    },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
      minHeight:400,
  },
    modalHeader: {
        position:'relative',
        marginBottom: 20,
        backgroundColor: GColors.primary,
        paddingVertical: 10,
        alignItems:'center',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
    modalTitle:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
  closeModalButton: {
      position: 'absolute',
      top: 10,
      left: 10,
    padding: 10,
  },
  formContainer: {},

  saveCardButton: {
    backgroundColor: GColors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveCardText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
    placeOrderButton:{
      backgroundColor: GColors.primary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 10
    },
    placeOrderText:{
        color:GColors.white,
        fontSize:18,
        fontWeight:"bold"
    }
});

export default CheckoutScreen;