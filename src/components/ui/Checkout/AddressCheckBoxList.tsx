import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useAddressAndContactStore } from "../../../store/useStore"; // You'll need to create a RN version of this store
import {
  Address,
  Contact,
  AddressAndContactsData,
} from "../../../types/ResponceTypes"; // Adjust if needed
import EmptyBox from "../Layout/Empty/EmptyBox"; // You'll need a RN version of this

// Define Types (example, modify as needed)
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

export default function AddressCheckBoxList() {
  const {
    contactsAndAddress,
    selectedAddressId,
    setSelectedAddressId,
    setSelectedContactId,
    setSelectedContactAndAddress,
    setSelectedDefaultAddressId,
    selectedDefaultAddressId,
  } = useAddressAndContactStore(); // Replace with the React Native store

  const [data, setData] = useState<AddressAndContactsData | null>(
    sampleAddressData
  );

  // const mutation = useMutation({
  //     mutationFn: updateDefaultAddress,
  //     onSuccess: (data) => {
  //         console.log('address changed', data);
  //     },
  //     onError: (error: { response: { data: { msg: string } } }) => {
  //         console.log(error);
  //         alert('error setting default address');
  //     },
  // });

  const handleCheckboxChange = (
    checked: boolean,
    contactId: number,
    addressId: number,
    contact: Contact,
    address: Address
  ) => {
    if (checked) {
      setSelectedContactId(contactId);
      setSelectedAddressId(addressId);
      setSelectedContactAndAddress({ contact, address });
    } else {
      setSelectedContactId(null);
    }
  };

  const handleMakeDefault = (addressId: number) => {
    // mutation.mutate(addressId);
    setSelectedDefaultAddressId(addressId);
    Alert.alert("Success", "Default Address Changed successfully!");
    console.log("setting as default address", addressId);
  };

  if (data?.contact.length == 0) return <EmptyBox text="No Address Found" />;

  if (data)
    return (
      <ScrollView>
        {data?.contact.map((contact, index) => (
          <View
            style={[
              styles.contactContainer,
              index === 0 ? styles.firstContact : null,
            ]}
            key={contact.id}
          >
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactSeparator}> | </Text>
              <Text style={styles.contactPhone}>{contact.phone}</Text>
            </View>
            {contact.Address.map((address) => (
              <View style={styles.addressItem} key={address.id}>
                <View>
                  <CustomCheckbox
                    checked={selectedAddressId === address.id}
                    onPress={(checked) =>
                      handleCheckboxChange(
                        checked,
                        contact.id,
                        address.id,
                        contact,
                        address
                      )
                    }
                  />
                </View>
                <View style={styles.addressDetails}>
                  <View>
                    <Text style={styles.addressText}>
                      {address.address}, {address.locality}, {address.city},{" "}
                      {address.state}
                    </Text>
                    <Text style={styles.addressText}>
                      {address.postal_code}
                    </Text>
                    <TouchableOpacity
                      style={styles.defaultCheckboxContainer}
                      onPress={() => handleMakeDefault(address.id)}
                    >
                      <CustomCheckbox
                        checked={selectedDefaultAddressId === address.id}
                      />
                      <Text style={styles.defaultCheckboxText}>
                        make default address
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity>
                      <Text style={styles.actionButtonText}>edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={styles.actionButtonText}>delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    );
  return null;
}

const CustomCheckbox = ({
  checked,
  onPress,
}: {
  checked: boolean;
  onPress?: (checked: boolean) => void;
}) => (
  <TouchableOpacity
    style={[styles.checkboxBase, checked ? styles.checkboxChecked : null]}
    onPress={() => onPress && onPress(!checked)}
  >
    {checked && <View style={styles.checkboxInner} />}
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  checkboxBase: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 4,
  },
  checkboxChecked: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: "white",
    borderRadius: 2,
  },
  contactContainer: {
    paddingVertical: 16,
  },
  firstContact: {
    borderTopWidth: 0,
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contactSeparator: {
    fontSize: 16,
  },
  contactPhone: {
    fontSize: 16,
  },
  addressItem: {
    flexDirection: "row",
    gap: 10,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    margin: 8,
    marginLeft: 10,
    marginRight: 10,
  },
  addressDetails: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  addressText: {
    fontSize: 16,
  },
  defaultCheckboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 5,
  },
  defaultCheckboxText: {
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 16,
  },
  actionButtonText: {
    color: "#007bff",
    fontSize: 16,
  },
});
