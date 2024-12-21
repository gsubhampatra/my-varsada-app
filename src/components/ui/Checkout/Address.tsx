import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  ActivityIndicator,
  Alert,
  TextInput,
  Switch,
  FlatList
} from "react-native";
import SwitchAddress from "./SwitchAddress"; // Assuming this is a separate component
import {
  Address as AddressData,
  AddressAndContactsData,
} from "../../../types/ResponceTypes"; // You'll need to define these types
import ErrorBox from "../Layout/Error/ErrorBox"; // Replace with a React Native version
import { useAddressAndContactStore } from "../../../store/useStore"; // Replace with a React Native store

// Define Types (example, modify as needed)
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

const sampleAddressData: AddressAndContactsData = {
  status: true,
  contact: [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      Address: [
        {
          id: 101,
          address: "123 Main St",
          locality: "Downtown",
          postal_code: "12345",
          city: "Anytown",
          state: "CA",
          country: "USA",
          isDefault: true,
        },
        {
          id: 102,
          address: "456 Oak Ave",
          locality: "Suburb",
          postal_code: "67890",
          city: "Otherville",
          state: "NY",
          country: "USA",
          isDefault: false,
        },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      Address: [
        {
          id: 201,
          address: "789 Pine Ln",
          locality: "Uptown",
          postal_code: "54321",
          city: "Somecity",
          state: "TX",
          country: "USA",
          isDefault: true,
        },
      ],
    },
  ],
};

export default function Address() {
  const [open, setOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    setContactsAndAddress,
    selectedContactAndAddress,
    selectedDefaultAddressId,
    setSelectedDefaultAddressId,
    setSelectedAddressId,
    setSelectedContactId,
    setSelectedContactAndAddress,
    addedNewAddress,
  } = useAddressAndContactStore(); // Replace with React Native version

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [addressData, setAddressData] = useState<AddressAndContactsData | null>(
    null
  );

  useEffect(() => {
    const fetchAddress = async () => {
      setIsLoading(true);
      try {
        // const res = await api.get(API_ROUTES.USER.ADDRESS.GET_CONTACT_AND_ADDRESS);
        // const data: AddressAndContactsData = res.data;
        //simulating api call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data: AddressAndContactsData = sampleAddressData;
        setAddressData(data);

        if (data) {
          setContactsAndAddress(data);
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
              return undefined;
            })
            .filter(Boolean);

          if (defaultContacts && defaultContacts.length > 0) {
            setSelectedDefaultAddressId(defaultContacts[0]?.address?.id);
            setSelectedAddressId(defaultContacts[0]?.address?.id);
            if (defaultContacts[0]?.id) {
              setSelectedContactId(defaultContacts[0]?.id);
            }
            if (defaultContacts[0]?.address) {
              setSelectedContactAndAddress({
                contact: defaultContacts[0],
                address: defaultContacts[0].address,
              });
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Error Fetching Address");
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddress();
  }, [
    addedNewAddress,
    setContactsAndAddress,
    setSelectedDefaultAddressId,
    setSelectedAddressId,
    setSelectedContactId,
    setSelectedContactAndAddress,
  ]);

  // const { isLoading, isError } = useQuery({
  //     queryKey: ['address', addedNewAddress],
  //     queryFn: fetchAddress,
  //     refetchOnWindowFocus: false,
  //     onSuccess: (data) => {
  //         console.log(data);
  //         setContactsAndAddress(data.originalData);
  //         if (data?.defaultContacts.length > 0) {
  //             setSelectedDefaultAddressId(data.defaultContacts[0]?.address?.id);
  //             setSelectedAddressId(data.defaultContacts[0]?.address?.id);
  //             if (data.defaultContacts[0]?.id) {
  //                 setSelectedContactId(data.defaultContacts[0]?.id);
  //             }
  //             if (data.defaultContacts[0]?.address) {
  //                 setSelectedContactAndAddress({
  //                     contact: data.defaultContacts[0],
  //                     address: data.defaultContacts[0].address,
  //                 });
  //             }
  //         }
  //     },
  //     select: (data: AddressAndContactsData): SelectedData => {
  //         const defaultContacts = data?.contact
  //             .map((contact) => {
  //                 const defaultAddress = contact.Address.find(
  //                     (address) => address.isDefault
  //                 );
  //                 if (defaultAddress) {
  //                     return {
  //                         id: contact.id,
  //                         name: contact.name,
  //                         email: contact.email,
  //                         phone: contact.phone,
  //                         address: defaultAddress,
  //                     };
  //                 }
  //                 return undefined; // explicityly return undefined for clarity
  //             })
  //             .filter(Boolean); // Remove undefined entries

  //         return {
  //             originalData: data,
  //             defaultContacts,
  //         };
  //     },
  // });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (isError) return <ErrorBox text="Error Fetching Address" />;
 
  const selectedAddressId = selectedContactAndAddress?.address?.id;

    const renderAddressDetails = () => {
     if (addressData?.contact) {
        return (
              <FlatList
                  data={addressData.contact}
                  keyExtractor={(item) => item.id.toString()}
                renderItem={({item})=>(
                      <View >
                    {item.Address.map((address) => (
                       <View style={styles.addressItem} key={address.id}>
                            <View >
                                  <Text style={styles.addressTitle}>Home</Text>
                                   <Text style={styles.addressText}>
                                     {address.address}, {address.locality}, {address.city}, {address.state} {address.postal_code}
                                   </Text>
                             </View>
                             <View style={styles.addressAction}>
                                     <CustomRadio
                                      onPress={()=> {setSelectedAddressId(address.id) ;  setSelectedDefaultAddressId(address.id); setSelectedContactId(item.id); setSelectedContactAndAddress({contact:item, address: address})}}
                                       checked={selectedAddressId === address.id}
                                      />
                                     <View style={styles.defaultContainer}>
                                         <CustomCheckbox onPress={()=> {setSelectedAddressId(address.id); setSelectedDefaultAddressId(address.id); setSelectedContactId(item.id); setSelectedContactAndAddress({contact:item, address: address})}} checked={address.isDefault} />
                                         <Text style={styles.defaultText}>Make as Default Address</Text>
                                     </View>
                                </View>
                       </View>
                     ))}
                </View>
                )}
              />
          );
     }
     return null;
    };


  return (
    <View>
        <View style={styles.addAddressContainer}>
             <TouchableOpacity
          style={styles.addAddressButton}
          onPress={() => setIsModalVisible(true)}
        >
              <Text style={styles.addAddressButtonText}>Add New Address</Text>
        </TouchableOpacity>
      </View>

          {renderAddressDetails()}
      <CustomModal
        title="Add New Address"
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <AddAddressForm onClose={()=> setIsModalVisible(false)}/>
         </View>
      </CustomModal>
      <CustomDivider />
    </View>
  );
}


// Custom Divider component
const CustomDivider = () => <View style={styles.divider} />;

// Custom Drawer (using a Modal)
const CustomModal = ({
  title,
  isVisible,
  onClose,
  children,
}: {
  title: string;
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={isVisible}
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContentContainer}>
        <Text style={styles.modalTitle}>{title}</Text>
        <ScrollView style={styles.modalContentScrollView}>
          {children}
        </ScrollView>
        <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
          <Text style={styles.modalCloseButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);


//Custom Checkbox
const CustomCheckbox = ({ checked, onPress }: { checked: boolean, onPress: () => void }) => (
    <TouchableOpacity
        style={[styles.checkboxBase, checked && styles.checkboxChecked]}
        onPress={onPress}
    >
         {checked && <View style={styles.checkboxInner} />}
    </TouchableOpacity>
);
const CustomRadio = ({ checked, onPress }: { checked: boolean, onPress: () => void }) => (
    <TouchableOpacity
        style={[styles.radioBase, checked && styles.radioChecked]}
        onPress={onPress}
    >
         {checked && <View style={styles.radioInner} />}
    </TouchableOpacity>
);


//Add Address Form
const AddAddressForm = ({onClose}: {onClose: ()=> void}) => {

  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pinCode, setPinCode] = useState('');
    const [city, setCity] = useState('');
      const [state, setState] = useState('');
      const [mobileNumber, setMobileNumber] = useState('');
    const [isDefault, setIsDefault] = useState(false);

     const handleSaveAddress = () => {
        //Handle logic here
           console.log('saving Address with:', address, landmark, pinCode, city, state, mobileNumber, isDefault )
           Alert.alert('Address Saved successfully!');
            onClose();
    }
  return (
    <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
           <Text style={styles.formLabel}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter House no/ Street"
             onChangeText={text => setAddress(text)}
        />
      </View>
         <View style={styles.inputContainer}>
           <Text style={styles.formLabel}>Landmark</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Landmark"
           onChangeText={text => setLandmark(text)}
        />
      </View>
         <View style={styles.inputContainer}>
            <Text style={styles.formLabel}>PIN Code</Text>
        <TextInput
          style={styles.input}
            keyboardType="numeric"
          placeholder="Enter PIN Code"
           onChangeText={text => setPinCode(text)}
        />
      </View>
       <View style={styles.inputContainer}>
           <Text style={styles.formLabel}>City</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter City"
           onChangeText={text => setCity(text)}
        />
      </View>
       <View style={styles.inputContainer}>
           <Text style={styles.formLabel}>State</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter State"
           onChangeText={text => setState(text)}
        />
      </View>
         <View style={styles.inputContainer}>
              <Text style={styles.formLabel}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Mobile Number"
            keyboardType="phone-pad"
            onChangeText={text => setMobileNumber(text)}
        />
      </View>
        <View style={styles.defaultAddressContainer}>
              <Text style={styles.formLabel}>Make as Default Address</Text>
               <Switch value={isDefault} onValueChange={setIsDefault}/>
           </View>

         <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
            <Text style={styles.saveButtonText}>Save Address</Text>
          </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
    addAddressContainer: {
         marginTop: 10,
        marginBottom: 10,
      alignItems: 'flex-end'
    },
  addAddressButton: {
        backgroundColor: "#800080",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
     overflow: 'hidden'
  },
   addAddressButtonText: {
        color: "white",
        fontWeight: "bold",
    },
  addressContainer: {
    marginBottom: 20,
  },

  addressItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    alignItems: 'center',
         paddingVertical: 10,
         paddingHorizontal: 5,
        borderBottomWidth: 1,
         borderColor: '#e0e0e0'
  },

  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  defaultText: {
    fontSize: 14,
    color: "gray",
     marginLeft: 5
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  contactName: {
    fontSize: 16,
  },
  contactSeparator: {
    fontSize: 16,
  },
  contactPhone: {
    fontSize: 16,
  },
  addressText: {
    fontSize: 14,
        color: 'gray'
  },
  noAddressText: {
    color: "gray",
    fontSize: 16,
  },
    addressAction: {
        flexDirection: 'row',
        alignItems: 'center'
    },
     defaultContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
      checkboxBase: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
         borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        marginRight: 10,
    },
    checkboxChecked: {
        backgroundColor: '#800080',
         borderColor: '#800080',
    },
    checkboxInner: {
        width: 10,
        height: 10,
        backgroundColor: 'white',
        borderRadius: 2,
    },
        radioBase: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
         borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        marginRight: 10,
    },
    radioChecked: {
        borderColor: '#800080',
    },
       radioInner: {
        width: 10,
        height: 10,
          backgroundColor: '#800080',
           borderRadius: 5
    },
  divider: {
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },
  modalContentContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "90%",
    maxWidth: 500,
    maxHeight: "90%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalContentScrollView: {
    flexGrow: 1,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalCloseButton: {
    padding: 10,
    alignSelf: "flex-end",
  },
  modalCloseButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
    formContainer: {
      marginTop: 20,
        paddingHorizontal: 10,
    },
      inputContainer: {
        marginBottom: 10,
    },
     formLabel: {
          fontSize: 16,
          fontWeight: 'bold',
           marginBottom: 5
     },
       input: {
        borderWidth: 1,
         borderColor: 'gray',
        borderRadius: 4,
        padding: 8,
        marginBottom: 5
    },
      saveButton: {
          backgroundColor: '#800080',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
          marginTop: 15
    },
     saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
          textAlign: 'center'
    },
     defaultAddressContainer: {
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between',
          marginBottom: 10,
   }
});