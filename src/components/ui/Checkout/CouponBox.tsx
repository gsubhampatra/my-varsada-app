import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert
} from 'react-native';
import { useCouponBoxStore } from '../../../store/useStore'; // Replace with your React Native store
import { CoinData } from '../../../types/ResponceTypes'; // You'll need to define this if needed

const sampleCoinData : CoinData = {
    status: true,
    coins: {
        amount: 100,
    },
};

export default function CouponBox() {
    const { setIsCoinRedeemed, setCoupon } = useCouponBoxStore(); // Replace with your React Native store
    const [couponState, setCouponState] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState<CoinData | null>(null);
    const [isRedeemed, setIsRedeemed] = useState(false);



      useEffect(() => {
        const fetchCoin = async () => {
          setIsLoading(true);
          try {
               // const res = await api.get(API_ROUTES.USER.GET_COINS);
              // if (!res.status) throw new Error('Failed to fetch coin data');
               //const data: CoinData = res.data;
                 await new Promise(resolve => setTimeout(resolve, 1000))
                const data: CoinData = sampleCoinData;

               setData(data);
          } catch (error) {
            console.error('Error fetching data:', error);
             Alert.alert('Error','Failed to fetch coin data')
            setIsError(true);
          } finally {
             setIsLoading(false);
          }
      };
      fetchCoin();
    },[]);
    // const { data, isError, isLoading } = useQuery<CoinData>({
    //     queryKey: ['coin'],
    //     queryFn: fetchCoin,
    // });

    const handleInput = (text: string) => {
        setCouponState(text);
    };

    const handleCheckboxChange = () => {
       setIsRedeemed(!isRedeemed)
        setIsCoinRedeemed(!isRedeemed);
    };


    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    if (isError) return <Text>Error...</Text>;

    return (
        <>
            <Text style={styles.title}>Have a Coupon ?</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Coupon Code"
                    onChangeText={handleInput}
                />
                 <TouchableOpacity
                      style={styles.applyButton}
                    onPress={() => setCoupon(couponState)}
                >
                    <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
            </View>

              {data && (
                <TouchableOpacity style={styles.redeemContainer}  onPress={handleCheckboxChange}>
                    <CustomCheckbox checked={isRedeemed}  />
                      <Text style={styles.redeemText}>
                           Redeem {data.coins.amount} Coins
                    </Text>
                 </TouchableOpacity>
                )}

        </>
    );
}

const CustomCheckbox = ({ checked }: { checked: boolean}) => (
    <TouchableOpacity
        style={[
            styles.checkboxBase,
            checked ? styles.checkboxChecked : null,
        ]}

    >
        {checked && <View style={styles.checkboxInner} />}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderColor: 'gray',
         borderWidth: 1,
         borderRadius: 5,

    },
     input: {
         flex: 1,
         padding: 8,
     },
       applyButton: {
        backgroundColor: 'transparent',
         padding: 8,
        fontWeight: 'bold',
    },
    applyButtonText: {
       color: '#007bff',
       fontWeight: 'bold',
    },
       redeemContainer: {
           flexDirection: 'row',
           alignItems: 'center',
            marginTop: 10
       },
    checkboxBase: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
         borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 4,
    },
    checkboxChecked: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
    },
        checkboxInner: {
        width: 10,
        height: 10,
          backgroundColor: 'white',
           borderRadius: 2
    },
    redeemText: {
      marginLeft: 8,
    }
});