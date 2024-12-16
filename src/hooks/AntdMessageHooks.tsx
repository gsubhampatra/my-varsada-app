import Toast from "react-native-toast-message";

export const useToast = () => {
  const success = (text: string) => {
    Toast.show({
      type: "success",
      text1: text,
    });
  };

  const error = (text: string) => {
    Toast.show({
      type: "error",
      text1: text,
    });
  };

  const warning = (text: string) => {
    Toast.show({
      type: "warn",
      text1: text,
    });
  };

  return { success, error, warning };
};
