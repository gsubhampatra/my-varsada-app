import React from 'react';
import { View, StyleSheet } from 'react-native';

type Prop = {
  isShowFilters: boolean;
};

export default function ProductListLoading({ isShowFilters }: Prop) {
  return (
    <View
      style={[
        styles.grid,
        isShowFilters ? styles.gridCols3 : styles.gridCols4,
      ]}
    >
      {Array.from({ length: isShowFilters ? 6 : 8 }).map((_, index) => (
        <View key={index} style={styles.skeleton} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    margin: 8,
    gap: 4,
  },
  gridCols3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCols4: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  skeleton: {
    width: '100%',
    height: 300,
    backgroundColor: '#e0e0e0',
  },
});

