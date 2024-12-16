import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Picker,
  ScrollView,
  Alert,
} from "react-native";
import { useForm } from "react-hook-form";
import { usePostUserData } from "../../../hooks/mutations";
import { isAxiosError } from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform } from "react-native";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

interface IFormInput {
  firstName: string;
  lastName: string;
  dob: Date | null;
  email: string;
  gender: GenderEnum;
  phone: string;
}

type PersonalInformationProps = {
  required: { email: string | null; phone: string | null };
  dark: boolean;
};

export default function PersonalInformation({
  required,
  dark,
}: PersonalInformationProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<IFormInput>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const postUserData = usePostUserData();

  const onChangeDatePicker = (event: any, selectedDate: any) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setValue("dob", selectedDate);
    }
  };

  const onSubmit = (data: IFormInput) => {
    if (required.email != null) data.email = required.email;
    if (required.phone != null) data.phone = required.phone;

    const formattedDob = data.dob ? data.dob.toISOString() : null;
    postUserData.mutate(
      {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        dob: formattedDob,
        gender: data.gender,
      },
      {
        onSuccess: (response) => {
          Alert.alert("Success", "Data submitted successfully!");
          window.location.reload();
          if (response.data) {
            console.log("Data:", response.data);
          }
        },
        onError: (error) => {
          if (isAxiosError(error)) {
            Alert.alert(
              "Error",
              error.response?.data?.msg || "Error Submitting Data"
            );
            console.error("Error response:", error.response?.data);
          }
        },
      }
    );
  };
  const dobValue = watch("dob");
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Personal Information</Text>
        <View style={styles.formContainer}>
          <View style={styles.formGrid}>
            <View style={styles.formColumn}>
              <View>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={[styles.input, dark ? null : styles.inputLight]}
                  placeholder="Enter First Name"
                  {...register("firstName", { required: true, maxLength: 20 })}
                  aria-invalid={errors.firstName ? "true" : "false"}
                />
                {errors.firstName?.type === "required" && (
                  <Text style={styles.errorText}>First name is required</Text>
                )}
              </View>

              <View>
                <Text style={styles.label}>Date of Birth</Text>
                <TouchableOpacity
                  style={[
                    styles.input,
                    dark ? null : styles.inputLight,
                    { justifyContent: "center" },
                  ]}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text
                    style={{ color: dobValue ? "black" : "grey", fontSize: 16 }}
                  >
                    {dobValue ? dobValue.toLocaleDateString() : "Enter DOB"}
                  </Text>
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={dobValue || new Date()}
                    mode="date"
                    onChange={onChangeDatePicker}
                  />
                )}
              </View>
              <View>
                <Text style={styles.label}>Gender</Text>
                <View style={[styles.select, dark ? null : styles.inputLight]}>
                  <Picker style={{ flex: 1 }} {...register("gender")}>
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Other" value="other" />
                  </Picker>
                </View>
              </View>
            </View>

            <View style={styles.formColumn}>
              <View>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={[styles.input, dark ? null : styles.inputLight]}
                  placeholder="Enter Last Name"
                  {...register("lastName", { required: true, maxLength: 20 })}
                  aria-invalid={errors.lastName ? "true" : "false"}
                />
                {errors.lastName?.type === "required" && (
                  <Text style={styles.errorText}>Last name is required</Text>
                )}
              </View>

              {required.email == null ? (
                <View>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={[styles.input, dark ? null : styles.inputLight]}
                    placeholder="Enter Email Address"
                    {...register("email", { required: true, maxLength: 20 })}
                    aria-invalid={errors.email ? "true" : "false"}
                    keyboardType="email-address"
                  />
                  {errors.email?.type === "required" && (
                    <Text style={styles.errorText}>Email is required</Text>
                  )}
                </View>
              ) : (
                <View>
                  <Text style={styles.label}>Email</Text>
                  <View
                    style={[
                      styles.input,
                      styles.disabledInput,
                      dark ? null : styles.inputLight,
                    ]}
                  >
                    <Text style={styles.disabledText}>{required.email}</Text>
                  </View>
                </View>
              )}
              {required.phone == null ? (
                <View>
                  <Text style={styles.label}>Phone Number</Text>
                  <TextInput
                    style={[styles.input, dark ? null : styles.inputLight]}
                    placeholder="Enter Phone Number"
                    {...register("phone", { required: true, maxLength: 20 })}
                    aria-invalid={errors.phone ? "true" : "false"}
                    keyboardType="number-pad"
                  />
                  {errors.phone?.type === "required" && (
                    <Text style={styles.errorText}>
                      Phone Number is required
                    </Text>
                  )}
                </View>
              ) : (
                <View>
                  <Text style={styles.label}>Phone Number</Text>
                  <View
                    style={[
                      styles.input,
                      styles.disabledInput,
                      dark ? null : styles.inputLight,
                    ]}
                  >
                    <Text style={styles.disabledText}>{required.phone}</Text>
                  </View>
                </View>
              )}
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F8EDEB",
    flex: 1,
  },
  content: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
  formContainer: {
    marginTop: 20,
    flex: 1,
  },
  formGrid: {
    flexDirection: "row",
    gap: 20,
  },
  formColumn: {
    flex: 1,
    flexDirection: "column",
    gap: 20,
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    padding: 10,
    borderRadius: 5,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "#00000099",
  },
  inputLight: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#00000099",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  disabledInput: {
    backgroundColor: "#dddd",
  },
  disabledText: {
    color: "#777",
  },
  select: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#00000099",
    backgroundColor: "white",
  },
  errorText: {
    color: "#FB6F92",
    marginTop: 5,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#C473FF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
