import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import MainNav from "../components/common/MainNav";

const LoginScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/images/ban1.png")}
        style={styles.backgroundImage}
      />
      <View style={styles.container}>

        <View style={styles.content}>
          <Text style={styles.welcomeText}>Welcome to Varsada !!</Text>
          <Text style={styles.myAccountText}>My Account</Text>

          <TextInput
            placeholder="Enter Phone Number or E- mail to Login"
            style={styles.input}
            placeholderTextColor="#999"
          />

          <View style={styles.otpContainer}>
            <TextInput
              placeholder="Enter OTP"
              style={[styles.input, styles.otpInput]}
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.getOtpButton}>
              <Text style={styles.getOtpButtonText}>Get OTP</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => {
              router.navigate("/home");
            }}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>OR</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <AntDesign name="google" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <MaterialIcons name="facebook" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <MaterialIcons name="apple" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    flex: 1,
    resizeMode: "cover",
    zIndex: -1,
    filter: "blur(6px)",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
  },
  navIcons: {
    flexDirection: "row",
    gap: 10,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  myAccountText: {
    fontSize: 20,
    marginBottom: 30,
    color: "white",
  },
  input: {
    width: "90%",
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  otpContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  otpInput: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ccc",
    width: "70%",
    marginRight: 5,
  },
  getOtpButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ccc",

    width: "25%",
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  getOtpButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#AB55D5",
    width: "90%",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
  },
  skipButton: {
    marginBottom: 20,
  },
  skipText: {
    color: "white",
    fontSize: 16,
  },
  orText: {
    color: "white",
    fontSize: 16,
    margin: 20,
  },
  socialButtons: {
    flexDirection: "row",
    gap: 15,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 50,
    color: "white",
  },
  socialIcon: {
    width: 25,
    height: 25,
  },
});

export default LoginScreen;
