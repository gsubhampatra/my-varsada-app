import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Linking,
} from "react-native";
import { useState } from "react";
import { useUserStore } from "../../store/useStore";
import { API_ROUTES } from "../../kv";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../http/axiosconfig";
import { GoogleIcon } from "../../assets/icons";

type MeData = {
  status: boolean;
  user: {
    uid: string;
    uid_type: "EMAIL" | "PHONE";
  };
};

async function fetchMe(): Promise<MeData> {
  const res = await api.get(API_ROUTES.AUTH.ME);
  return res.data;
}

async function postOtup(payload: { uid: string }) {
  const res = await api.post(API_ROUTES.AUTH.REQUEST_OTP, payload);
  return res.data;
}

async function postVerifyOtp(payload: { uid: string; otp: string }) {
  const res = await api.post(API_ROUTES.AUTH.VERIFY_OTP, payload);
  return res.data;
}

export default function Login() {
  const { setIsLogedIn, isLoginSkipped, setIsLoginSkipped } = useUserStore();
  const [input, setInput] = useState<string>();
  const [inputOtp, setInputOtp] = useState<string>();
  const navigation = useNavigation();

  const handelInput = (e: string) => {
    // setInput(e);
  };

  const handelInputOtp = (e: string) => {
    // setInputOtp(e);
  };

  // const otpMutation = useMutation(postOtup, {
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  //   onError: (err) => {
  //     console.error("Error getting OTP:", err);
  //   },
  // });

  // const verifyOtpMutation = useMutation(postVerifyOtp, {
  //   onSuccess: (data) => {
  //     console.log(data);
  //     if (data.status) {
  //       if (data.signup) {
  //         console.log(data.signup);
  //         navigation.navigate("signup");
  //       } else {
  //         setIsLogedIn(true);
  //         navigation.navigate("/");
  //       }
  //     }
  //   },
  //   onError: (err) => {
  //     console.error("Error getting OTP:", err);
  //   },
  // });

  const getOtp = async () => {
    // if (!input) {
    //   return alert("Empty Input: give email or phone");
    // }
    // const payload = {
    //   uid: input,
    // };
    // otpMutation.mutate(payload);
  };

  const verifyOtp = async () => {
    // if (!input || !inputOtp) {
    //   return alert("Empty Inputs");
    // }
    // const payload = {
    //   uid: input,
    //   otp: inputOtp,
    // };

    // verifyOtpMutation.mutate(payload);
  };

  // const { data } = useQuery({
  //   queryKey: ["me"],
  //   queryFn: fetchMe,
  //   refetchOnWindowFocus: false,
  // });

  // if (data?.status) {
  //   navigation.navigate("/signup");
  //   setIsLogedIn(true);
  // }

  return (
    <SafeAreaView>
      <View>
        <Image
          source={require("../../assets/images/ban1.png")}
          alt="banner"
          style={styles.banner}
        />
        <View style={styles.container}>
          <View style={styles.heading}>
            <Text style={styles.title}>Welcome To Varsada</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text>Enter email or phone</Text>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={handelInput}
              placeholder="Enter Email or Phone"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Enter OTP</Text>
            <View style={styles.otpContainer}>
              <TextInput
                style={styles.otpInput}
                value={inputOtp}
                onChangeText={handelInputOtp}
                placeholder="- - - - - -"
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.getOtpButton} onPress={getOtp}>
                <Text style={styles.getOtpButtonText}>Get OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={verifyOtp}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.skipButton}
              onPress={() => {
                setIsLoginSkipped(!isLoginSkipped);
              }}
            >
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.socialButtonContainer}>
            <TouchableOpacity
              style={styles.googleButton}
              onPress={() => Linking.openURL(API_ROUTES.AUTH.GOOGLE)}
            >
              <GoogleIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  otpInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginRight: 10,
  },
  getOtpButton: {
    backgroundColor: "#007aff",
    borderRadius: 5,
    padding: 10,
  },
  getOtpButtonText: {
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#007aff",
    borderRadius: 5,
    padding: 10,
  },
  loginButtonText: {
    color: "white",
  },
  skipButton: {
    backgroundColor: "#e6e6e6",
    borderRadius: 5,
    padding: 10,
  },
  skipButtonText: {
    color: "#007aff",
  },
  socialButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  googleButton: {
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});
