import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { GColors } from "@/src/constants/GStyles";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const BottomModal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <AntDesign name="close" size={27} color="white" />
        </TouchableOpacity>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
          </View>
          <ScrollView style={styles.formContainer}>{children}</ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    height: "auto",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  modalHeader: {
    marginTop: -15,
    marginHorizontal: -15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    backgroundColor: GColors.primary,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    padding: 10,
  },
  closeButton: {
    backgroundColor: GColors.primary,
    padding: 10,
    borderRadius: 100,
    alignSelf: "center",
    top: -20,
    width: 48,
    
  },
  formContainer: {
    marginBottom: 10,
  },
});

export default BottomModal;
