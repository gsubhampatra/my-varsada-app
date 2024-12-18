import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useProductFilter } from "../../../../context/ProductFiltersContext";
import { Filter } from "../../../../types/productTypes";

const sampleData = [
  { label: "Clothing", value: 1 },
  { label: "Shoes", value: 2 },
  { label: "Accessories", value: 3 },
  { label: "Electronics", value: 4 },
];

export default function FilterCategory() {
  const [isVewMoreCategory, setIsViewMoreCategory] = useState(false);
  const { setProductFilters } = useProductFilter();

  const onChange = (checkedValues: number[]) => {
    console.log("checked = ", checkedValues);
    setProductFilters(
      (prev) => ({ ...prev, categoryTypeIds: checkedValues } as Filter)
    );
  };

  const [options, setOptions] = useState(sampleData);

  return (
    <View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Category</Text>
        {options.map((option, index) => (
          <View key={index} style={styles.optionContainer}>
            <CheckBox
              value={options
                .filter((opt) => opt.value === option.value)
                .some((opt) => opt.checked)}
              onValueChange={(checked) =>
                onChange(
                  checked
                    ? options.map((opt) =>
                        opt.value === option.value
                          ? { ...opt, checked: true }
                          : opt
                      )
                    : options.map((opt) =>
                        opt.value === option.value
                          ? { ...opt, checked: false }
                          : opt
                      )
                )
              }
            />
            <Text style={styles.optionLabel}>{option.label}</Text>
          </View>
        ))}
      </View>
      <Button
        title={
          !isVewMoreCategory
            ? `+${options.length - options.slice(0, 5).length} more`
            : "View Less"
        }
        color="#007AFF"
        onPress={() => setIsViewMoreCategory(!isVewMoreCategory)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "column",
    gap: 4,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  optionLabel: {
    color: "#00000099",
    lineHeight: 20,
    fontWeight: "500",
  },
});

const CheckBox = ({
  value,
  onValueChange,
}: {
  value: boolean;
  onValueChange: (value: boolean) => void;
}) => {
  return (
    <View style={styles2.checkboxContainer}>
      <View style={styles2.checkbox}>
        {value && <View style={styles2.checkboxInner} />}
      </View>
      <TouchableOpacity onPress={() => onValueChange(!value)}>
        <Text style={styles2.checkboxLabel} />
      </TouchableOpacity>
    </View>
  );
};

const styles2 = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: "#007AFF",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#00000099",
  },
});
