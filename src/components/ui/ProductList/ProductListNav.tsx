import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useProductFilter } from '../../../context/ProductFiltersContext';
import { Filter } from '../../../types/productTypes';

export default function ProductListNav() {
  const { setProductFilters } = useProductFilter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Listing</Text>
      <View style={styles.breadcrumb}>
        <Link href="/">
          <Text style={styles.breadcrumbItem}>Home</Text>
        </Link>
      </View>
      <View style={styles.selectContainer}>
        <Text style={styles.selectLabel}>Sort By</Text>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => {
            setProductFilters((prev) => ({ ...prev, sort: 'new' }) as Filter);
          }}
        >
          <Text style={styles.selectButtonText}>What's New</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => {
            setProductFilters((prev) => ({ ...prev, sort: 'lth' }) as Filter);
          }}
        >
          <Text style={styles.selectButtonText}>Price Low to High</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => {
            setProductFilters((prev) => ({ ...prev, sort: 'htl' }) as Filter);
          }}
        >
          <Text style={styles.selectButtonText}>Price High to Low</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbItem: {
    fontSize: 16,
    marginRight: 8,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  selectLabel: {
    fontSize: 16,
  },
  selectButton: {
    backgroundColor: '#e5e5e5',
    padding: 8,
    borderRadius: 4,
  },
  selectButtonText: {
    fontSize: 16,
  },
});

