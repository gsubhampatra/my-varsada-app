import { View, Text } from "react-native";
import React from "react";
import FilterHeader from "../components/filter/FilterHeader";
import ProductList from "../components/filter/ProductList";

const SearchList = () => {
  const filters = ["All", "Food", "Drinks", "Snacks", "Desserts"];
  const [selectedFilter, setSelectedFilter] = React.useState<string | null>(
    null
  );
  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
  };


  const onHeartPress = (productId: number) => {
    console.log(`Heart icon pressed for product with ID: ${productId}`);
  };

  return (
    <View>
      <Text>SearchList</Text>
      <FilterHeader
        filters={filters}
        onFilterSelect={handleFilterSelect}
        selectedFilter={selectedFilter}
      />
    </View>
  );
};

export default SearchList;
