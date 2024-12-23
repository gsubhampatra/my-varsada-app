import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

import { GColors } from "@/src/constants/GStyles";
import AddAddressDrawer from "../components/checkout/addressDrawer";
import BottomModal from "../components/common/modal";

// Define the address structure
interface Address {
  id: string;
  address: string;
  isDefault: boolean;
}

// Sample data for the address list with the Address interface
const sampleAddresses: Address[] = [
  {
    id: "1",
    address: "1901 Thornridge Cir, Shiloh, Hawaii 81063",
    isDefault: false,
  },
  {
    id: "2",
    address: "1901 Thornridge Cir, Shiloh, Hawaii 81063",
    isDefault: false,
  },
  {
    id: "3",
    address: "1901 Thornridge Cir, Shiloh, Hawaii 81063",
    isDefault: false,
  },
  {
    id: "4",
    address: "1901 Thornridge Cir, Shiloh, Hawaii 81063",
    isDefault: true,
  },
];

// Custom Checkbox Component with TypeScript types
interface CustomCheckboxProps {
  checked: boolean;
  onPress: () => void;
}
const CustomCheckbox = React.memo<CustomCheckboxProps>(
  ({ checked, onPress }) => (
    <TouchableOpacity
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={onPress}
    >
      {checked && <View style={styles.checkboxInner} />}
    </TouchableOpacity>
  )
);

// Custom Radio Component with TypeScript types
interface CustomRadioProps {
  checked: boolean;
  onPress: () => void;
}
const CustomRadio = React.memo<CustomRadioProps>(({ checked, onPress }) => (
  <TouchableOpacity
    style={[styles.radioBase, checked && styles.radioChecked]}
    onPress={onPress}
  >
    {checked && <View style={styles.radioInner} />}
  </TouchableOpacity>
));

// Apply Button Component with TypeScript types
interface ApplyButtonProps {
  onPress: () => void;
}
const ApplyButton = React.memo<ApplyButtonProps>(({ onPress }) => (
  <TouchableOpacity style={styles.applyButton} onPress={onPress}>
    <Text style={styles.applyButtonText}>Apply</Text>
  </TouchableOpacity>
));

// Address Item Component
interface AddressItemProps {
  item: Address;
}

const AddressItem = React.memo<AddressItemProps>(({ item }) => {
  const handleCheckboxPress = useCallback(() => {
    console.log(`Default Address Changed for ID : ${item.id}`);
  }, [item.id]);

  const handleRadioPress = useCallback(() => {
    console.log(`Radio Selected for ID : ${item.id}`);
  }, [item.id]);
  return (
    <View style={styles.addressItem}>
      <View>
        <View style={styles.addressTextContainer}>
          <Text style={styles.addressTitle}>Home</Text>
          <Text style={styles.addressText}>{item.address}</Text>
        </View>
        <View style={styles.addressAction}>
          <View style={styles.defaultContainer}>
            <CustomCheckbox
              onPress={handleCheckboxPress}
              checked={item.isDefault}
            />
            <Text style={styles.defaultText}>Make as Default Address</Text>
          </View>
          <CustomRadio checked={item.isDefault} onPress={handleRadioPress} />
        </View>
      </View>
    </View>
  );
});

export default function SavedAddressScreen() {
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  const handleOpenDrawer = useCallback(() => {
    setIsDrawerVisible(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerVisible(false);
  }, []);

  const handleApplyPress = useCallback(() => {
    console.log("Apply button pressed");
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.addressListContainer}>
        <FlatList
          data={sampleAddresses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AddressItem item={item} />}
        />
        <TouchableOpacity
          style={styles.newAddressButton}
          onPress={handleOpenDrawer}
        >
          <Text style={styles.newAddressText}>Add New Address</Text>
        </TouchableOpacity>
      </View>
      <BottomModal
        isVisible={isDrawerVisible}
        title="Add New Address"
        onClose={handleCloseDrawer}
      >
        <Text>Drawer Content</Text>
        <Text>Drawer Content</Text>
        <Text>Drawer Content</Text>
        <Text>Drawer Content</Text>
        <Text>Drawer Content</Text>
        <Text>Drawer Content</Text>
        <Text>Drawer Content</Text>
        <Text>Drawer Content</Text>
        <Text>Drawer Content</Text>
        <Text>Drawer Content</Text>
        <Text>Drawer Content</Text>
      </BottomModal>
      <ApplyButton onPress={handleApplyPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GColors.white,
  },
  addressListContainer: {
    flex: 1,
    padding: 10,
  },
  addressItem: {
    marginBottom: 20,
  },
  addressTextContainer: {
    marginBottom: 10,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  addressText: {
    fontSize: 14,
  },
  addressAction: {
    flexDirection: "row",
    alignItems: "center",
  },
  defaultContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  defaultText: {
    fontSize: 14,
  },
  newAddressButton: {
    backgroundColor: GColors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  newAddressText: {
    color: GColors.white,
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: GColors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  applyButtonText: {
    color: GColors.white,
    fontSize: 16,
  },
  checkboxBase: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: GColors.primary,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: GColors.primary,
  },
  checkboxInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: GColors.white,
  },
  radioBase: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: GColors.primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  radioChecked: {
    backgroundColor: GColors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: GColors.white,
  },
});
