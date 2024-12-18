// RelatedProducts.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface RelatedProduct {
    id: string;
    image: string;
    title: string;
    price: string;
}

const sampleRelatedProducts: RelatedProduct[] = [
    {
        id: '1',
        image: 'https://i.pinimg.com/564x/f6/a0/1c/f6a01c1a48bbdf78121c26221528dd8e.jpg',
        title: 'Colored crop top',
        price: '₹2300.00',
    },
    {
        id: '2',
        image: 'https://i.pinimg.com/564x/5a/c0/58/5ac0586e2a014e451d4c8949a628c8d0.jpg',
        title: 'Colored crop top',
        price: '₹2300.00',
    },
    {
        id: '3',
        image: 'https://i.pinimg.com/564x/d6/3f/d5/d63fd5c208a0d487b34ab648a154d717.jpg',
        title: 'Colored crop top',
        price: '₹2300.00',
    },
    {
        id: '4',
        image: 'https://i.pinimg.com/564x/f6/a0/1c/f6a01c1a48bbdf78121c26221528dd8e.jpg',
        title: 'Colored crop top',
        price: '₹2300.00',
    },
    {
        id: '5',
        image: 'https://i.pinimg.com/564x/5a/c0/58/5ac0586e2a014e451d4c8949a628c8d0.jpg',
        title: 'Colored crop top',
        price: '₹2300.00',
    },
     {
        id: '6',
        image: 'https://i.pinimg.com/564x/d6/3f/d5/d63fd5c208a0d487b34ab648a154d717.jpg',
         title: 'Colored crop top',
         price: '₹2300.00',
     },
];

const RelatedProducts: React.FC = () => {
    const renderItem = ({ item }: {item: RelatedProduct}) => (
        <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                  <Image source={{ uri: item.image }} style={styles.image}/>
                  <TouchableOpacity style={styles.heartIconContainer}>
                      <AntDesign
                            name="hearto"
                           size={16}
                          color="white"
                        />
                    </TouchableOpacity>
                  <View style={styles.discountTag}>
                      <Text style={styles.discountText}>45% OFF</Text>
                </View>
              </View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>{item.price}</Text>
        </View>
    );
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Related Products</Text>
      <FlatList
        data={sampleRelatedProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
      paddingVertical: 10
    },
  header: {
      fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    itemContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 8
    },
    imageContainer:{
        position: 'relative',
        width: '100%',
        height: 100,
        overflow: 'hidden',
        borderRadius: 8
    },
    image: {
    width: '100%',
        height: '100%',
      resizeMode: 'cover'
    },
    heartIconContainer: {
        position: 'absolute',
      top: 5,
      right: 5,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 100,
        padding: 4,
    },
   discountTag: {
        position: 'absolute',
        top: 5,
        left: 5,
        backgroundColor: 'purple',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 2,
    },
    discountText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
  title: {
    fontSize: 14,
      textAlign: 'center'
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RelatedProducts;