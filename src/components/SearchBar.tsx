import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

type SearchBarProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
};

const SearchBar = ({ placeholder, value, onChangeText }: SearchBarProps) => {
  return (
    <View style={styles.container}>
     <View style={styles.input} >
      <Feather name="search" size={24} color="black" style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        />
        </View>
      <AntDesign name="hearto" size={24} color="black" style={styles.heart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15, // Padding for content
    paddingVertical: 5,
    borderWidth: 1, // Light border
    borderColor: "#ddd",
    width: "100%",
    position: "fixed",
    top: 0,
    zIndex: 2,
  },
  icon: {
    
  },
  input: {
     flex: 1, // Takes up remaining space
    alignItems: "center",
    flexDirection: "row",
    fontSize: 16,
    backgroundColor: "#eee", // Light gray background
    paddingVertical: 8,
    paddingLeft: 5,
    borderRadius: 25, // Rounded edges

  },
  heart: {
    marginLeft: 10,
  },
});

export default SearchBar;
