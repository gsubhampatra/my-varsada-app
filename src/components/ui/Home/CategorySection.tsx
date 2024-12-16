import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { API_ROUTES } from '../../../kv';
import ProductListLoading from '../Layout/Loading/ProductListLoading';
import EmptyBox from '../Layout/Empty/EmptyBox';
import { GColors } from '@/src/constants/GStyles';

type CategoryType = {
  id: string;
  type_name: string;
  thumbnail: string;
  isActive: boolean;
  isVisible: boolean;
};

type Data = {
  categoryType: CategoryType[];
};

const data: Data = {
  categoryType: [
    {
      id: '1',
      type_name: 'Clothing',
      thumbnail: 'https://via.placeholder.com/150',
      isActive: true,
      isVisible: true,
    },
    {
      id: '2',
      type_name: 'Shoes',
      thumbnail: 'https://via.placeholder.com/150',
      isActive: true,
      isVisible: true,
    },
    {
      id: '3',
      type_name: 'Accessories',
      thumbnail: 'https://via.placeholder.com/150',
      isActive: true,
      isVisible: true,
    },
    {
      id: '4',
      type_name: 'Electronics',
      thumbnail: 'https://via.placeholder.com/150',
      isActive: true,
      isVisible: true,
    },
  ],
};

// const fetchCategories = async (): Promise<Data> => {
//   const res = await fetch(API_ROUTES.CATEGORY_TYPE.GET_ALL);
//   if (!res.ok) throw new Error('Failed to fetch categories');
//   return res.json();
// };

export default function Category() {
  // const { data, isLoading, error } = useQuery<Data>({
  //   queryKey: ['category'],
  //   queryFn: fetchCategories,
  // });

  // if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  // if (error) return <EmptyBox text="No Category Found" />;

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Shop by Category</Text>
        <Link href="/category"><Text style={styles.viewMore}>View More</Text></Link>
      </View>
      <View   style={styles.scrollViewContainer}>
        {data?.categoryType?.slice(0, 4).map((cat) => (
          <TouchableOpacity key={cat.id} style={styles.categoryCard} onPress={() => { /* handle navigation */ }}>
            <Image source={{ uri: cat.thumbnail }} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.categoryName}>{cat.type_name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 80,
    paddingVertical: 20,
  },
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GColors.black,
  },
  viewMore: {
    fontSize: 16,
    color: GColors.primary,
  },
  scrollViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryCard: {
    backgroundColor: '#f9f9f9',
    position: 'relative',
    width: 160,
    height: 196,
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  categoryName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

