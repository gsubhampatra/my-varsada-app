// ProductLongDesc.tsx
import { GColors } from "@/src/constants/GStyles";
import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function ProductLongDesc({ desc }: { desc?: string }) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const MAX_LENGTH = 200;

  if (!desc) return null;

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isExpanded || desc.length <= MAX_LENGTH
          ? desc
          : `${desc.slice(0, MAX_LENGTH)} ...`}
      </Text>
      {desc.length > MAX_LENGTH && (
        <Text onPress={toggleExpand} style={[styles.text, styles.button]}>
          {isExpanded ? "Read Less" : "Read More"}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    fontSize: 20,
    color: "#222",
  },
  button: {
    color: GColors.primary,
  },
});