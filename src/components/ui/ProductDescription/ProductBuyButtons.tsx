import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { VarsadaBagPayload } from '../../../types/productTypes';
import { useMutation } from '@tanstack/react-query';
import { postVarsadaBag } from '../../../hooks/mutations';
import api from '../../../http/axiosconfig';
import { API_ROUTES } from '../../../kv';
import { useProductStore } from '../../../store/useStore';

type InInBagData = {
  status: boolean;
  isInBag: boolean;
};

async function fetchIsInBag(productId: number, colorId: string) {
  const response = await api.post(API_ROUTES.USER.CHECK_BAG, {
    productId,
    colorId,
  });
  if (!response.data.status) throw new Error('Failed to check bag');
  return response.data;
}

async function fetchRemoveBag(productId: number, colorId: string) {
  const response = await api.post(API_ROUTES.USER.REMOVE_FROM_BAG, {
    productId,
    colorId,
  });
  if (!response.data.status) throw new Error('Failed to remove from bag');
  return response.data;
}

export default function ProductBuyButtons({
  productId,
  payload,
}: {
  productId: string;
  payload: VarsadaBagPayload;
}) {
  const { selectedColorId } = useProductStore();
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const mutation = useMutation({
    mutationFn: postVarsadaBag,
    onSuccess: () => {
      setIsAdded(!isAdded);
      alert('Product added to bag');
    },
    onError: (error: { response: { data: { msg: string } } }) => {
      console.log(error);
      alert(error.response.data.msg);
    },
  });

  const mutationCheck = useMutation({
    mutationKey: ['isInBag'],
    mutationFn: () => fetchIsInBag(parseInt(productId), selectedColorId),
    onSuccess: (data: InInBagData) => {
      console.log(data);
      setIsAdded(data.isInBag);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const mutationRemove = useMutation({
    mutationKey: ['removeFromBag'],
    mutationFn: () => fetchRemoveBag(parseInt(productId), selectedColorId),
    onSuccess: (data) => {
      console.log(data);
      alert('Product removed from bag');
    },
    onError: (error: { response: { data: { msg: string } } }) => {
      console.log(error);
      alert(error.response.data.msg);
    },
  });

  useEffect(() => {
    if (selectedColorId) {
      setIsAdded(false);
    }
  }, [selectedColorId]);

  useEffect(() => {
    payload.quantity = quantity;
  }, [quantity]);

  return (
    <View style={styles.container}>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => {
            if (quantity > 1) setQuantity(quantity - 1);
          }}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => {
            if (quantity < 5) setQuantity(quantity + 1);
          }}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (isAdded) {
            mutationRemove.mutate();
            setIsAdded(!isAdded);
          } else {
            mutationCheck.mutate();
            if (payload.selectedSizeId == '') alert('Please select size');
            else if (payload.selectedColorId == '')
              alert('Please Select Color');
            else mutation.mutate(payload);
          }
        }}
      >
        <Text style={styles.buttonText}>
          {isAdded ? 'Remove From Varsada Bag' : 'Add to Varsada Bag'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Shop This</Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        Only 5 Stock Left for delivery
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    flexDirection: 'column',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  quantityButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 28,
    color: '#000',
  },
  quantityText: {
    fontSize: 20,
    color: '#000',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  text: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.5)',
  },
});

