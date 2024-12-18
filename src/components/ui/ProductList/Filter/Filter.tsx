import React from 'react';
import { View, StyleSheet } from 'react-native';
import FilterCategory from './FilterCategory';
import FilterPrice from './FilterPrice';
import FilterColor from './FilterColor';
import FilterSize from './FilterSize';
// import FilterStyle from './FilterStyle';
import { useProductFilter } from '../../../../context/ProductFiltersContext';

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: '#E5E5EA',
    borderBottomWidth: 1,
    marginVertical: 16,
  },
});

export default function Filter() {
  const { setProductFilters, productFilters } = useProductFilter();
  return (
    <View>
      <View style={styles.divider} />
      <FilterCategory />
      <View style={styles.divider} />
      <FilterPrice setFilters={setProductFilters} />
      <View style={styles.divider} />
      <FilterColor
        setFilters={setProductFilters}
        ColorFilter={productFilters?.color}
      />
      <View style={styles.divider} />
      <FilterSize
        setFilters={setProductFilters}
        Sizefilter={productFilters?.size}
      />
      {/* <View style={styles.divider} />
      <FilterStyle /> */}
    </View>
  );
}

