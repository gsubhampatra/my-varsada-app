// ProductPrice.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { PurpleHeartIcon, PurpleShareIcon } from '../../../assets/icons';
import useLocalStorageList from '../../../hooks/localStoragehooks';
import { useMutation } from '@tanstack/react-query';

interface prop {
  price?: number;
  productId: number;
}
// Placeholder functions for mutations since there's no API
export async function addToDreamList(productId: number) {
    console.log(`Added to dream list: ${productId}`);
    return { status: true }
  }
  
  export async function removeFromDreamList(productId: number) {
      console.log(`Removed from dream list: ${productId}`);
    return {status: true}
  }


export default function ProductPrice({ price, productId }: prop) {
  const { list, addProduct, removeProduct } = useLocalStorageList('dreamList');

  const addMutation = useMutation(addToDreamList, {
    onSuccess: () => {
      addProduct(productId.toString());
    },
  });

  const removeMutation = useMutation(removeFromDreamList, {
    onSuccess: () => {
      removeProduct(productId.toString());
    },
  });

  return (
    <>
      <View style={styles.container}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{price}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {list.includes(productId.toString()) ? (
            <Pressable
              style={styles.button}
              onPress={() =>
                removeMutation.mutate(parseInt(productId.toString()))
              }
            >
              <PurpleHeartIcon fill={true} />
            </Pressable>
          ) : (
            <Pressable
              style={styles.button}
              onPress={() =>
                addMutation.mutate(parseInt(productId.toString()))
              }
            >
              <PurpleHeartIcon fill={false} />
            </Pressable>
          )}
          <PurpleShareIcon />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginRight: 8,
  },
});