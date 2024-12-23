import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { GColors } from "@/src/constants/GStyles";

interface FilterHeaderProps {
  filters: string[];
  onFilterSelect?: (filter: string) => void;
  selectedFilter: string | null;
}

const FilterHeader: React.FC<FilterHeaderProps> = ({
  filters,
  onFilterSelect,
  selectedFilter,
}) => {
  const handleFilterSelect = useCallback(
    (filter: string) => {
      if (onFilterSelect) {
        onFilterSelect(filter);
      }
    },
    [onFilterSelect]
  );

  return (
    <View style={styles.container}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[
            styles.filterButton,
            selectedFilter === filter && styles.filterButtonSelected,
          ]}
          onPress={() => handleFilterSelect(filter)}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === filter && styles.filterTextSelected,
            ]}
          >
            {filter}
            <AntDesign
              name="down"
              size={10}
              color={
                selectedFilter === filter ? GColors.white : GColors.primary
              }
            />
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: GColors.white,
  },
  filterButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
    borderColor: GColors.primary,
    borderWidth: 1,
  },
  filterButtonSelected: {
    backgroundColor: GColors.primary,
  },
  filterText: {
    fontSize: 14,
    color: GColors.primary,
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  filterTextSelected: {
    color: GColors.white,
  },
});

export default FilterHeader;
