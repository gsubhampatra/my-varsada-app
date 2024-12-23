import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

interface SideDrawerProp {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SideDrawer = ({ isVisible, onClose, children }: SideDrawerProp) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <TouchableWithoutFeedback>
          <View style={styles.sideDrawerContainer}>
            <View style={styles.drawerHeader}>
              <TouchableOpacity onPress={onClose}>
                <MaterialIcons name={"close"} size={24} color={"gray"} />
              </TouchableOpacity>
            </View>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  sideDrawerContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: "70%",
    backgroundColor: "#fff",
    padding: 16,
  },
  drawerHeader: {
    marginBottom: 16,
    alignItems: "flex-end",
  },
});

export default SideDrawer;
