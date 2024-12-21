import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    FlatList,
    Alert,
} from 'react-native';
import ProductCheckOutCard from '../Product/ProductCheckOutCard'; // Make sure it is React Native
import { BagData } from '../../../types/ResponceTypes'; // Using the provided type
import { postCalculateCheckout } from '../../../hooks/mutations'; // You'll need a RN version if applicable
import {
    useBagStore,
    useCheckoutCalculateStore,
    useCouponBoxStore,
} from '../../../store/useStore'; // Replace with a React Native store
import Address from './Address'; // Import a React Native version of Address
import ErrorBox from '../Layout/Error/ErrorBox'; // You'll need a React Native version
import EmptyBox from '../Layout/Empty/EmptyBox'; // You'll need a React Native version

// Sample Data (for demo purposes)
const sampleBagData: BagData = {
    status: true,
  bag: [
     {
      id: '1',
      productId: 1,
      product: {
        product_name: 'Sample Product 1',
        short_description: "a short description",
        long_description: "a very long description",
        price: 49.99,
        sizeAvailable: ['S', 'M', 'L'],
      },
      colorId: 1,
      color: {
        color_name: 'Red',
        hex_value: '#FF0000',
        medias: [{ url: 'https://via.placeholder.com/100' }],
      },
      size: 'M',
      quantity: 2,
      sizeAvailable: ['S', 'M', 'L'],
    },
       {
      id: '2',
        productId: 2,
      product: {
        product_name: 'Sample Product 2',
           short_description: "a short description",
        long_description: "a very long description",
        price: 29.99,
         sizeAvailable: ['S', 'M', 'L'],
      },
       colorId: 2,
      color: {
        color_name: 'Blue',
        hex_value: '#0000FF',
        medias: [{ url: 'https://via.placeholder.com/100' }],
      },
      size: 'S',
      quantity: 1,
       sizeAvailable: ['S', 'M', 'L'],
    },
    {
         id: '3',
        productId: 3,
      product: {
        product_name: 'Sample Product 3',
        short_description: "a short description",
        long_description: "a very long description",
        price: 99.99,
         sizeAvailable: ['S', 'M', 'L'],
      },
       colorId: 3,
      color: {
        color_name: 'Green',
        hex_value: '#00FF00',
        medias: [{ url: 'https://via.placeholder.com/100' }],
      },
      size: 'L',
      quantity: 2,
       sizeAvailable: ['S', 'M', 'L'],
    }
  ],
};

export default function ProductSelect() {
    const [selectedBagIds, setSelectedBagIds] = useState<string[]>([]);
    const { setSelectedBagIdsStore } = useBagStore();
    const { setCheckoutCalculate } = useCheckoutCalculateStore();
    const { isCoinRedeemed, coupon } = useCouponBoxStore();

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState<BagData | null>(null);

    useEffect(() => {
        const fetchBag = async () => {
          setIsLoading(true);
          try {
               // const res = await api.get(API_ROUTES.USER.GET_FROM_BAG);
              // const data: BagData = res.data;
               await new Promise(resolve => setTimeout(resolve, 1000))
               const data: BagData = sampleBagData;
               setData(data);
          } catch (error) {
            console.error('Error fetching data:', error);
            setIsError(true);
            Alert.alert('Error', 'Error Fetching Bag')
          } finally {
             setIsLoading(false);
          }
      };
      fetchBag();
    },[]);
    // const { data, isLoading, isError } = useQuery<BagData>({
    //     queryKey: ['bag'],
    //     queryFn: fetchBag,
    // });


    // const mutation = useMutation({
    //     mutationFn: postCalculateCheckout,
    //     onSuccess: (data) => {
    //         console.log('Checkout calculated', data);
    //         setCheckoutCalculate(data);
    //     },
    //     onError: (error: { response: { data: { msg: string } } }) => {
    //          console.log(error);
    //         Alert.alert('Error',error.response.data.msg);
    //     },
    // });

    useEffect(() => {
        if (selectedBagIds.length > 0) {
         //   mutation.mutate({ data: selectedBagIds, coupon, isCoin: isCoinRedeemed });
            console.log('calculating checkout with', selectedBagIds, coupon, isCoinRedeemed)
        }
        setSelectedBagIdsStore(selectedBagIds);
    }, [selectedBagIds, coupon, isCoinRedeemed, setSelectedBagIdsStore]);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }


    if (isError) return <ErrorBox text="Error Fetching Bag" />;
     if (!data || data.bag.length === 0) return <EmptyBox text="Varsada Bag Is Empty" />;


    const handleCheckboxChange = (checked: boolean, bagId: string) => {
       setSelectedBagIds((prev) =>
           checked ? [...prev, bagId] : prev.filter((id) => id !== bagId)
       );
    };

    const isSelected = (bagId: string) => selectedBagIds.includes(bagId);

    return (
        <ScrollView>
            <Address />
            <View style={styles.selectAllContainer}>
                <CustomCheckbox
                   indeterminate={
                    selectedBagIds.length > 0 && selectedBagIds.length < data.bag.length
                    }
                    checked={selectedBagIds.length === data.bag.length}
                    onPress={(checked) => {
                        if(checked) {
                           setSelectedBagIds(data.bag.map((item) => item.id));
                        } else {
                             setSelectedBagIds([]);
                        }
                  }}

                 />
                 <Text style={styles.selectText}>
                  {selectedBagIds.length}/{data.bag.length} selected
                </Text>
            </View>

                <FlatList
                    data={data.bag}
                    keyExtractor={(item) => item.id}
                     renderItem={({ item }) => (
                        <View>
                            <CustomDivider />
                            <View style={styles.productItemContainer}>
                            <View style={styles.checkboxContainer}>
                                <CustomCheckbox
                                    checked={isSelected(item.id)}
                                    onPress={(checked) => handleCheckboxChange(checked, item.id)}
                                />
                            </View>
                                <ProductCheckOutCard
                                  img={item.color.medias[0].url}
                                  title={item.product.product_name}
                                  color={item.color.color_name}
                                  price={item.product.price}
                                  selectedSize={item.size}
                                  quantity={item.quantity}
                                  sizes={item.product.sizeAvailable}
                                />
                          </View>
                        </View>
                    )}
                />


             {/* Display selected bag IDs */}
            <View style={styles.selectedBagContainer}>
                <Text style={styles.selectedBagText}>
                 Selected Bag IDs: {JSON.stringify(selectedBagIds)}
                </Text>
            </View>
        </ScrollView>
    );
}

const CustomCheckbox = ({ checked, onPress, indeterminate }: { checked: boolean, onPress: (checked:boolean)=> void, indeterminate?: boolean }) => (
    <TouchableOpacity
        style={[
            styles.checkboxBase,
            checked ? styles.checkboxChecked : null,
             indeterminate ? styles.checkboxIndeterminate: null
        ]}
         onPress={() => onPress(!checked)}
    >
         {checked && <View style={styles.checkboxInner} />}
          {indeterminate && <View style={styles.checkboxIndeterminateInner} />}
    </TouchableOpacity>
);

const CustomDivider = () => (
    <View style={styles.divider} />
);

const styles = StyleSheet.create({
       loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectAllContainer: {
        flexDirection: 'row',
        alignItems: 'center',
         marginVertical: 10,
        marginLeft: 15,
    },
    selectText: {
        marginLeft: 8,
         fontSize: 16,
        color: 'black',
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
          checkboxIndeterminate: {
             borderColor: '#007bff',
        },
       checkboxInner: {
        width: 10,
        height: 10,
          backgroundColor: 'white',
           borderRadius: 2
    },
       checkboxIndeterminateInner: {
       width: 10,
        height: 2,
        backgroundColor: 'black',

    },
      productItemContainer: {
       flexDirection: 'row',
          alignItems: 'flex-start',
        gap: 8,
        marginTop: 10,
         marginLeft: 15,
          marginRight: 10,
      },
        checkboxContainer: {
       paddingTop: 10,
    },
      divider: {
          borderBottomColor: '#e0e0e0',
          borderBottomWidth: 1,
           marginVertical: 10,
       },
       selectedBagContainer: {
         margin: 10
    },
    selectedBagText: {
        fontSize: 14,
        color: 'gray',
    },
});