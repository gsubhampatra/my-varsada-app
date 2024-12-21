import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Switch,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

interface IFormInput {
  name: string;
  email: string;
  phone: string;
  address: string;
  locality: string;
  postal_code: string;
  city: string;
  state: string;
  country: string;
  isDefault: boolean;
}

export default function AddAddressBox({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      locality: "",
      postal_code: "",
      city: "",
      state: "",
      country: "",
      isDefault: false,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // const mutation = useMutation({
  //     mutationFn: postAddAddress,
  //     onSuccess: (data) => {
  //         console.log('address added', data);
  //         setSwitchAddress(true);
  //         setAddedNewAddress('changed');
  //     },
  //     onError: (error: { response: { data: { msg: string } } }) => {
  //         console.log(error);
  //         alert('error adding address');
  //     },
  // });

  const onSubmit = (data: IFormInput) => {
    console.log("i am getting called");
    console.log(data);
    // setIsLoading(true);
    // mutation.mutate(data);

    // simulate success or error
    setTimeout(() => {
      //  setIsLoading(false);
      Alert.alert("Success", "Address Saved successfully!");
      reset();
      onClose();
    }, 1000);
    // setIsLoading(false);
    // onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView>
            <Text style={styles.modalTitle}>Add New Address</Text>
            <View style={styles.formContainer}>
              {/* Full Name Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <Controller
                  control={control}
                  rules={{
                    required: "Full name is required",
                    maxLength: { value: 20, message: "Max 20 characters" },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Full Name"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="name"
                />
                {errors.name && (
                  <Text style={styles.errorText}>{errors.name.message}</Text>
                )}
              </View>

              {/* Mobile Number Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Mobile Number</Text>
                <Controller
                  control={control}
                  rules={{
                    required: "Mobile Number is required",
                    maxLength: { value: 20, message: "Max 20 characters" },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Mobile Number"
                      keyboardType="phone-pad"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="phone"
                />
                {errors.phone && (
                  <Text style={styles.errorText}>{errors.phone.message}</Text>
                )}
              </View>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <Controller
                  control={control}
                  rules={{
                    required: "Email is required",
                    maxLength: { value: 50, message: "Max 50 characters" },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Email"
                      keyboardType="email-address"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="email"
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email.message}</Text>
                )}
              </View>

              {/* Address Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Address</Text>
                <Controller
                  control={control}
                  rules={{
                    required: "Address is required",
                    maxLength: { value: 50, message: "Max 50 characters" },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Address (House no, Building Street)"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="address"
                />
                {errors.address && (
                  <Text style={styles.errorText}>{errors.address.message}</Text>
                )}
              </View>

              {/* Locality Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Locality</Text>
                <Controller
                  control={control}
                  rules={{
                    required: "Locality is required",
                    maxLength: { value: 20, message: "Max 20 characters" },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Locality"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="locality"
                />
                {errors.locality && (
                  <Text style={styles.errorText}>
                    {errors.locality.message}
                  </Text>
                )}
              </View>

              {/* Pin Code Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>PIN Code</Text>
                <Controller
                  control={control}
                  rules={{
                    required: "Pin code is required",
                    maxLength: { value: 20, message: "Max 20 characters" },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Pin Code"
                      keyboardType="number-pad"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="postal_code"
                />
                {errors.postal_code && (
                  <Text style={styles.errorText}>
                    {errors.postal_code.message}
                  </Text>
                )}
              </View>

              {/* City Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>City</Text>
                <Controller
                  control={control}
                  rules={{
                    required: "City is required",
                    maxLength: { value: 20, message: "Max 20 characters" },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Enter City"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="city"
                />
                {errors.city && (
                  <Text style={styles.errorText}>{errors.city.message}</Text>
                )}
              </View>

              {/* State Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>State</Text>
                <Controller
                  control={control}
                  rules={{
                    required: "State is required",
                    maxLength: { value: 20, message: "Max 20 characters" },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Enter State"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="state"
                />
                {errors.state && (
                  <Text style={styles.errorText}>{errors.state.message}</Text>
                )}
              </View>

              {/* Country Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Country</Text>
                <Controller
                  control={control}
                  rules={{
                    required: "Country is required",
                    maxLength: { value: 20, message: "Max 20 characters" },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Country"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="country"
                />
                {errors.country && (
                  <Text style={styles.errorText}>{errors.country.message}</Text>
                )}
              </View>

              {/* Set as Default Switch */}
              <View style={styles.checkboxContainer}>
                <Controller
                  control={control}
                  name="isDefault"
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.switchContainer}>
                      <Text style={styles.label}>Set as Default Address</Text>
                      <Switch value={value} onValueChange={onChange} />
                    </View>
                  )}
                />
              </View>
            </View>
            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSubmit(onSubmit)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.saveButtonText}>Save</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  formContainer: {
    gap: 15,
  },
  inputContainer: {
    gap: 5,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "transparent",
    paddingVertical: 12,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "gray",
    marginRight: 10,
  },
  cancelButtonText: {
    color: "gray",
    fontWeight: "bold",
    textAlign: "center",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
