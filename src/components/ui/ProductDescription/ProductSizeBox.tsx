import { VarsadaBagPayload } from '@/src/types/productTypes';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProductSizeBox({
  sizes,
  payload,
}: {
  sizes: string[];
  payload: VarsadaBagPayload;
}) {
  const [selectedSize, setSelectedSizeState] = useState<string>();

  return (
    <View style={styles.container}>
      {sizes.map((size) => (
        <TouchableOpacity
          key={size}
          style={[styles.button, selectedSize === size ? styles.selected : null]}
          onPress={() => {
            setSelectedSizeState(size);
            payload.selectedSizeId = size;
          }}
        >
          <Text style={[styles.text, selectedSize === size ? styles.selectedText : null]}>
            {size}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#333',
    borderColor: '#333',
  },
  selectedText: {
    color: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

