import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FilterIcon } from "../../../assets/icons";
import { useProductFilter } from "../../../context/ProductFiltersContext";

type Props = {
  isShowFilters: boolean;
  setIsShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  filterButtonText: {
    fontSize: 16,
    marginLeft: 8,
  },
  clearAllButton: {
    fontSize: 16,
    color: "#1890ff",
  },
  selectedFiltersContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  selectedFilter: {
    backgroundColor: "#1890ff",
    padding: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedFilterText: {
    color: "white",
    fontSize: 12,
  },
});

export default function ProductListFilterHeader({
  isShowFilters,
  setIsShowFilters,
}: Props) {
  const { setProductFilters } = useProductFilter();

  return (
    <View style={styles.container}>
      <View style={styles.filterButton}>
        <FilterIcon />
        <Text style={styles.filterButtonText}>
          {isShowFilters ? "Hide Filters" : "Show Filters"}
        </Text>
      </View>
      {isShowFilters ? (
        <TouchableOpacity onPress={() => setProductFilters(undefined)}>
          <Text style={styles.clearAllButton}>Clear All</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
