import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useAddressAndContactStore } from "@/src/store/useStore";
import { useToast } from "@/src/hooks/AntdMessageHooks";
import { useMutation } from "@tanstack/react-query";
import { API_ROUTES } from "@/src/kv";
import api from "@/src/http/axiosconfig";
import { GColors } from "@/src/constants/GStyles";

interface AddressData {
    address: string;
    locality: string;
    postal_code: string;
    city: string;
    state: string;
    country:string;
    isDefault: boolean;
    contactId: number | null;
}

const AddAddressDrawer: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => {
  const { selectedContactId, setAddedNewAddress, addedNewAddress } = useAddressAndContactStore();
    const { success, error, warning } = useToast();
  const [address, setAddress] = useState("");
    const [landmark, setLandmark] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
    const [mobileNumber, setMobileNumber] = useState('');
  const [makeDefault, setMakeDefault] = useState(false);
  const { mutate: createAddress } = useMutation({
    mutationFn: async (data: AddressData) => {
      const response = await api.post(API_ROUTES.USER.ADDRESS.CREATE, data);
        setAddedNewAddress(addedNewAddress + response.data.id)
      return response.data;
    },
    onSuccess: () => {
        success("Address added successfully");
        onClose();
    },
    onError: () => {
        error("Failed to add new Address.");
    },
  });

    const handleAddAddress = () => {
      if(!address || !landmark || !pinCode || !city || !state || !mobileNumber){
          warning("Please Fill All details")
          return;
      }
      if (!selectedContactId) {
          error("Please select a contact before adding address");
           onClose();
          return;
      }

      createAddress({
            address,
            locality:landmark,
            postal_code: pinCode,
            city,
            state,
            country:'India',
            isDefault: makeDefault,
            contactId: selectedContactId
        });

    };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>
              <Text style={styles.headerTitle}>Add New Address</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter House no/ Street"
                style={styles.input}
                value={address}
                onChangeText={setAddress}
              />
            </View>
              <View style={styles.inputContainer}>
              <TextInput
                  placeholder="Enter Landmark"
                  style={styles.input}
                  value={landmark}
                  onChangeText={setLandmark}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter PIN Code"
                style={styles.input}
                keyboardType="numeric"
                value={pinCode}
                onChangeText={setPinCode}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter City"
                style={styles.input}
                value={city}
                onChangeText={setCity}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter State"
                style={styles.input}
                value={state}
                onChangeText={setState}
              />
            </View>
              <View style={styles.inputContainer}>
                  <TextInput
                      placeholder="Enter Mobile Number"
                      style={styles.input}
                      keyboardType="numeric"
                      value={mobileNumber}
                      onChangeText={setMobileNumber}
                  />
              </View>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  makeDefault && styles.checkboxSelected,
                ]}
                onPress={() => setMakeDefault(!makeDefault)}
              >
                {makeDefault && (
                  <View style={styles.checkboxInner}></View>
                )}
              </TouchableOpacity>
              <Text>Make as Default Address</Text>
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleAddAddress}>
              <Text style={styles.saveText}>Save Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
       </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    padding: 20,
    minHeight: 400,
  },
  header: {
      position:'relative',
    marginBottom: 20,
    backgroundColor: GColors.primary,
      paddingVertical: 10,
    alignItems:'center',
      borderTopLeftRadius:20,
      borderTopRightRadius:20
  },
    headerTitle:{
      color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
  closeButton: {
    position:'absolute',
      top: 10,
    left: 10,
    padding: 10,
  },
  formContainer: {},
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 3,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    backgroundColor: GColors.primary,
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: "white",
    borderRadius: 2,
  },
  saveButton: {
    backgroundColor: GColors.primary,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  saveText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AddAddressDrawer;