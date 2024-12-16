import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useProductStore } from '../../../store/useStore';
import { VarsadaBagPayload } from '../../../types/productTypes';
import { ProductColorData } from '../../../types/ResponceTypes';

type Props = {
  colorData: ProductColorData['productColor'];
  payload: VarsadaBagPayload;
};

export default function ProductColor({ colorData, payload }: Props) {
  const { selectedColorId, setSelectedColorId } = useProductStore();

  const selectColor = (color: string) => {
    setSelectedColorId(color);
    payload.selectedColorId = color;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Color</Text>
      <View style={styles.colorContainer}>
        {colorData.map((prodobj, index) => (
          <Pressable
            style={[styles.colorButton, { backgroundColor: prodobj.hex_value }, selectedColorId === prodobj.id && styles.colorButtonSelected]}
            key={index}
            onPress={() => selectColor(prodobj.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  text: {
    fontSize: 16,
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 999,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  colorButtonSelected: {
    borderWidth: 2,
  },
});


